"""UTILS
Misc helpers/utils functions
"""

# # Native # #
import os
import json
import math
from time import time
from uuid import uuid4
from typing import Union

# # Package # #
from .database import admin, manager, enterprises

# # Installed # #
import pandas as pd
from mailmerge import MailMerge
from num2words import num2words
from datetime import datetime

__all__ = ("get_time", "get_uuid", "adminFilesProcessing", "managerFilesProcessing", "invoiceGenerator", "summaryGenerator")


def get_time(seconds_precision=True) -> Union[int, float]:
    """Returns the current time as Unix/Epoch timestamp, seconds precision by default"""
    return time() if not seconds_precision else int(time())


def get_uuid() -> str:
    """Returns an unique UUID (UUID4)"""
    return str(uuid4())

def adminFilesProcessing(path,export_channel,export_item,pricing):
    """Admin Files are Processed here"""
    # Pricing file
    pricingFile = pd.read_excel(path+pricing, engine='openpyxl')
    pricingFile.columns = pricingFile.iloc[3]
    pricingFile = pricingFile.drop(pricingFile.index[0])
    pricingFile = pricingFile.drop(pricingFile.index[0])
    pricingFile = pricingFile.drop(pricingFile.index[0])
    pricingFile = pricingFile.drop(pricingFile.index[0])

    # Export Channel Item Type
    exportChannelItemFile = pd.read_csv(path+export_channel, engine ='python')
    exportChannelItemFile = exportChannelItemFile[~exportChannelItemFile["Channel Name"].str.contains("FLIPKART")]
    
    # Export Item Master
    exportItemFile = pd.read_csv(path+export_item, engine ='python')

    count = 0
    adminData = []
    for i in range(len(exportChannelItemFile)): 
        adminFile = {}
        adminFile["asin"] = exportChannelItemFile.iloc[i]["Channel Product Id"]
        adminFile["master_sku"] = exportChannelItemFile.iloc[i]["Uniware Sku Code"]
        adminFile["inventory"] = exportChannelItemFile.iloc[i]["Next Inventory Update"]
        adminFile["our_cost"] = pricingFile.loc[pricingFile['ASIN'] == adminFile["asin"]]['Cost'].values
        adminFile["our_cost"] = adminFile["our_cost"][0] if len(adminFile["our_cost"]) else 0
        sku = adminFile["master_sku"]
        data = exportItemFile.loc[exportItemFile['Product Code'] == sku]
        adminFile["bundle_items"] = []
        adminFile["name"] = data["Name"].values[0] if len(data["Name"].values) else "NA" 
        adminFile["hsn"] = data["HSN CODE"].values[0] if len(data["HSN CODE"].values) else "NA" 
        
        if len(data["Type"].values) and data["Type"].values[0] == "BUNDLE":
            bundle = []
            for i in range(len(data["Component Product Code"].values)):
                name = exportItemFile.loc[exportItemFile['Product Code'] == data["Component Product Code"].values[i]]['Name'].values[0]
                bundle.append({
                    "sku": data["Component Product Code"].values[i],
                    "name": name,
                    "quantity": data["Component Quantity"].values[i],
                })
            count+=1
            adminFile["bundle_items"] = bundle
        adminData.append(adminFile)

    # Inserting data to admin database
    for data in adminData:
        asin = data["asin"]
        if admin.find_one({"asin": asin}):
            admin.update_one({"asin": asin}, {"$set": data})
        else:
            admin.insert_one(data)     

def managerFilesProcessing(path, purchase, quantity = None):
    """Manager Files are Processed here"""
        
    # Getting Purchase Order
    purchaseOrderFile = pd.read_excel(path + purchase, engine='openpyxl',)
    po = purchaseOrderFile.groupby(["PO"])[['ASIN', 'Unit Cost', 'Quantity Requested', 'Ship to location']].apply(lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    
    if quantity:
        quantityFile = pd.read_excel(path + quantity, skiprows=2,)
        quantityFile = quantityFile[quantityFile['Barcode'].notna()]

    # Fetching Admin data from database 
    adminFile = pd.DataFrame(list(admin.find()))

    managerData = []
    for k in po:
        database = {}
        database["_id"] = get_uuid()
        database["purchase_order"] = k
        database["tracking_id"] = "NA"
        database["return_status"] = "NA"
        database["order_status"] = "Incoming"
        database["ship_to_location"] = po[k][0][3]
        database["created"] = database["updated"] = get_time() 
        database["items"] = []
        for data in po[k]:
            adminData = adminFile.loc[adminFile['asin'] == data[0]]
            if quantity and not adminData['master_sku'].empty:
                currentStock = quantityFile.loc[quantityFile["Barcode"] == adminData['master_sku'].values[0]]
                if currentStock.empty:
                    currentStock = 0
                else: 
                    currentStock = currentStock["Current Stock"].values[0]

            database["items"].append({
                "asin": data[0],
                "unit_cost": data[1],
                "quantity": data[2],
                "shipped" : False,
                "stock": True if quantity and currentStock >= data[2] else False,
                "name": adminData["name"].values[0] if len(adminData["name"]) else "NA",
                "hsn": adminData["hsn"].values[0] if len(adminData["hsn"]) else "NA",
                "inventory": adminData["inventory"].values[0] if len(adminData["inventory"]) else "NA",
                "master_sku" : adminData["master_sku"].values[0] if len(adminData["master_sku"]) else "NA",
                "bundle_item": adminData["bundle_items"].values[0] if len(adminData["bundle_items"]) else [],
                "our_cost": adminData["our_cost"].values[0] if len(adminData["our_cost"]) else "NA"
            })
        managerData.append(database)
    managerData
    
    # Inserting Manager data to database 
    manager.insert_many(managerData)

def invoiceGenerator(managerData, enterpriseData, enterpriseToData, billedTo):
    template = "API_engine/template/invoice_template.docx"
    document = MailMerge(template)
    document.merge(
        PONumber = managerData["purchase_order"],
        billedto = billedTo,
        BusinessName = enterpriseData["name"],
        Businessaddress = enterpriseData["address"]["street"] + ", " + enterpriseData["address"]["city"] + ", " + enterpriseData["address"]["state"] + ", " + enterpriseData["address"]["zip_code"],
        Businessemail = enterpriseData["email"],
        Businessmobile = enterpriseData["phone"],
        BusinessWebsite = enterpriseData["website"],
        BusinessGSTIN = enterpriseData["GSTIN"],
        Bankname = enterpriseData["bank_name"],
        Branch = enterpriseData["branch_name"],
        IFSC = enterpriseData["ifsc"],
        AcNo = enterpriseData["account_number"],
        Name = enterpriseToData["name"],
        Address = enterpriseToData["address"]["street"] + ", " + enterpriseToData["address"]["city"] + ", " + enterpriseToData["address"]["state"] + ", " + enterpriseToData["address"]["zip_code"],
        Email = enterpriseToData["email"],
        Mobile = enterpriseToData["phone"],
        Website = enterpriseToData["website"],
        GSTIN = enterpriseToData["GSTIN"],
        Date = str(datetime.now().date()),
        Destination = str(managerData["ship_to_location"])
    )
    items = []
    for idx, item in enumerate(managerData["items"]):
        items.append({
            "ItemNo": str(idx),
            "ItemDescription": str(item["name"]),
            "ASIN": str(item["asin"]),
            "Quantity": str(item["quantity"]),
            "price": str(item["unit_cost"]),
            "HSN": str(int(item["hsn"]) if item["hsn"] != "NA" else "NA"),
            "Tax": str(18),
            "Amount": str(item["unit_cost"]*item["quantity"])
        })

    document.merge_rows('ItemNo', items)

    subTotal = round(sum(float(item["Amount"]) for item in items),2)
    totalQty = sum(float(item["Quantity"]) for item in items)
    cgst = sgst = round(subTotal*0.09,2)
    roundOff = round((math.ceil(cgst) - cgst)/2,3)
    total = round(subTotal + cgst + sgst + roundOff,2)
    totalNum = num2words(total, lang='en_IN').title()

    document.merge(
        Total = str(total),
        SubTotal = str(subTotal),
        TotalQty = str(totalQty),
        TotalNum = totalNum,
        SGST = str(sgst),
        CGST = str(cgst),
        RoundOff = str(roundOff)
    )
    
    filename = managerData["purchase_order"] + "_Invoice"
    folder_path = "Uploads/" + managerData["purchase_order"]
    if not os.path.isdir(folder_path):
        os.makedirs(folder_path)
    
    file_path = folder_path + "/" + filename + "_" + billedTo + ".docx"
    document.write(file_path)
    url = managerData["purchase_order"] + "/" + filename + "_" + billedTo + ".docx"
    return url

def summaryGenerator(SummaryData):
    template = "API_engine/template/summary_template.docx"
    document = MailMerge(template)
    document.merge(
        PONumber = SummaryData["purchase_order"],
        Date = str(datetime.now().date()),
        Destination = str(SummaryData["destination"])
    )
    items = []
    for idx, item in enumerate(SummaryData["items"]):
        items.append({
            "ASIN": str(item["asin"]),
            "ItemDescription": str(item["name"]),
            "Quantity": str(int(item["qty"])),
            "SKU": str(item["sku"]),
        })

    document.merge_rows('ASIN', items)

    totalQty = sum(int(item["Quantity"]) for item in items)
    
    document.merge(
        TotalQuantity = str(totalQty),
    )
    
    filename = SummaryData["purchase_order"] + "_Summary"
    folder_path = "Uploads/" + SummaryData["purchase_order"]
    if not os.path.isdir(folder_path):
        os.makedirs(folder_path)
    file_path = folder_path + "/" + filename +".docx"
    document.write(file_path)
    url = SummaryData["purchase_order"] + "/" + filename + ".docx"
    return url

def pickListGenerator(managerData):
    template = "API_engine/template/summary_template.docx"
    document = MailMerge(template)
    document.merge(
        PONumber = managerData["purchase_order"],
        Date = str(datetime.now().date()),
        Destination = str(managerData["ship_to_location"])
    )
    items = []
    for idx, item in enumerate(managerData["items"]):
        if "bundle_item" in item.keys() and len(item["bundle_item"]):
            for bundle_item in item["bundle_item"]:
                items.append({
                    "ASIN": str(item["asin"]),
                    "ItemDescription": str(bundle_item["name"]),
                    "Quantity": str(int(bundle_item["quantity"]*item["quantity"])),
                    "SKU": str(bundle_item["sku"]),
                })
        else:
            items.append({
                "ASIN": str(item["asin"]),
                "ItemDescription": str(item["name"]),
                "Quantity": str(item["quantity"]),
                "SKU": str(item["master_sku"]),
            })

    
    totalQty = sum(int(item["Quantity"]) for item in items)
    
    document.merge(
        TotalQuantity = str(totalQty),
    )
    
    document.merge_rows('ASIN', items)

    filename = managerData["purchase_order"] + "_Pick_List"
    folder_path = "Uploads/" + managerData["purchase_order"].split("_")[0]
    if not os.path.isdir(folder_path):
        os.makedirs(folder_path)
    file_path = folder_path + "/" + filename +".docx"
    document.write(file_path)
    url = managerData["purchase_order"].split("_")[0] + "/" + filename + ".docx"
    return url
