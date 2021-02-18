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

__all__ = ("get_time", "get_uuid", "adminFilesProcessing", "managerFilesProcessing", "invoiceGenerator", "summaryGenerator", "barcodeGenerator")


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

    print("Admin Files Fetched")
    count = 0
    adminData = []
    for i in range(len(exportChannelItemFile)): 
        adminFile = {}
        adminFile["_id"] = get_uuid()
        adminFile["asin"] = exportChannelItemFile.iloc[i]["Channel Product Id"]
        adminFile["master_sku"] = exportChannelItemFile.iloc[i]["Uniware Sku Code"]
        adminFile["inventory"] = int(exportChannelItemFile.iloc[i]["Next Inventory Update"] if not pd.isnull(exportChannelItemFile.iloc[i]["Next Inventory Update"]) else 0)
        adminFile["our_cost"] = pricingFile.loc[pricingFile['ASIN'] == adminFile["asin"]]['Cost'].values
        adminFile["our_cost"] = float(adminFile["our_cost"][0].replace(",", '')) if len(adminFile["our_cost"]) else 0
        sku = adminFile["master_sku"]
        data = exportItemFile.loc[exportItemFile['Product Code'] == sku]
        adminFile["bundle_items"] = []
        adminFile["name"] = data["Name"].values[0] if len(data["Name"].values) else "NA" 
        adminFile["hsn"] = data["HSN CODE"].values[0] if len(data["HSN CODE"].values) else "NA" 
        adminFile["created"] = adminFile["updated"] = get_time() 
        
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

    
    print("Admin Data Processed")
    # Inserting data to admin database
    for data in adminData:
        asin = data["asin"]
        if admin.find_one({"asin": asin}):
            admin.update_one({"asin": asin}, {"$set": {
                "master_sku": data["master_sku"],
                "inventory": data["inventory"],
                "our_cost": data["our_cost"],
                "name": data["name"],
                "hsn": data["hsn"],
                "bundle_items": data["bundle_items"],
            }})
        else:
            admin.insert_one(data)     
    
    print("Admin Data Inserted")

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
        #print(database["_id"])
        database["purchase_order"] = k
        database["tracking_id"] = "NA"
        database["eway"] = "NA"
        database["awb"] = "NA"
        database["return_status"] = False
        database["order_status"] = "Incoming"
        database["completed_status"] = False
        database["ship_to_location"] = po[k][0][3]
        database["box"] = []
        database["total_amt"] = 0
        database["invoice"] = []
        database["appt_date"] = "NA"
        database["appt_notes"] = "NA"
        database["created"] = database["updated"] = get_time() 
        database["items"] = []
        for data in po[k]:
            adminData = adminFile.loc[adminFile['asin'] == data[0]]
            if not adminData.empty:
                if quantity and not adminData['master_sku'].empty:
                    currentStock = quantityFile.loc[quantityFile["Barcode"] == adminData['master_sku'].values[0]]
                    if currentStock.empty:
                        currentStock = 0
                    else: 
                        currentStock = currentStock["Current Stock"].values[0]
                #print(str(adminData['asin'].values[0]))
                database["items"].append({
                    "asin_id": str(adminData['_id'].values[0]),
                    "unit_cost": float(str(data[1]).replace(',','')),
                    "quantity": int(str(data[2]).replace(",", '')),
                    "shipped" : False,
                    "stock": False if quantity and currentStock >= data[2] else True,
                    "details": {}
                })
        managerData.append(database)
    
    # Inserting Manager data to database
    for data in managerData:
        manager.insert_one(data)
        
def invoiceGenerator(managerData, enterpriseData, enterpriseToData, billedTo, invoiceNo):
    template = "API_engine/template/invoice_template.docx"
    document = MailMerge(template)
    document.merge(
        PONumber = managerData["purchase_order"],
        billedto = billedTo,
        InvoiceNumber = invoiceNo,
        eway = managerData["eway"],
        awb = managerData["awb"],
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
            "ItemNo": str(idx+1),
            "ItemDescription": str(item["details"]["name"]),
            "ASIN": str(item["details"]["asin"]),
            "Quantity": str(item["quantity"]),
            "price": str(item["unit_cost"]),
            "HSN": str(int(item["details"]["hsn"]) if item["details"]["hsn"] != "NA" else "NA"),
            "Tax": str(18),
            "Amount": str(item["unit_cost"]*item["quantity"])
        })

    document.merge_rows('ItemNo', items)

    subTotal = round(sum(float(item["Amount"]) for item in items),2)
    totalQty = sum(float(item["Quantity"]) for item in items)
    cgst = sgst = round(subTotal*0.09,2)
    
    total = round(subTotal + cgst + sgst)
    roundOff = round(subTotal + cgst + sgst - total,2)
    totalNum = num2words(total, lang='en_IN').title()

    document.merge(
        Total = str(int(total)),
        SubTotal = str(subTotal),
        TotalQty = str(int(totalQty)),
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
    manager.update_one({"purchase_order": managerData["purchase_order"]}, {"$set": {
        "total_amt": int(total)
    }})
    manager.update_one({"purchase_order": managerData["purchase_order"]}, {"$push": {
        "invoice": "http://104.45.155.38:5002/" + url
    }})
    return url

def summaryGenerator(SummaryData, boxNo):
    template = "API_engine/template/box_summary_template.docx"
    document = MailMerge(template)
    document.merge(
        PONumber = SummaryData["purchase_order"],
        Date = str(datetime.now().date()),
        BoxNo = boxNo,
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
    
    filename = SummaryData["purchase_order"] + "_box_" + boxNo + "_Summary"
    folder_path = "Uploads/" + SummaryData["purchase_order"]
    if not os.path.isdir(folder_path):
        os.makedirs(folder_path)
    file_path = folder_path + "/" + filename +".docx"
    document.write(file_path)
    url = SummaryData["purchase_order"] + "/" + filename + ".docx"
    manager.update_one({"purchase_order": SummaryData["purchase_order"]}, {"$push": {
        "box": "http://104.45.155.38:5002/" + url
    }})
    return url

def pickListGenerator(managerData):
    template = "API_engine/template/pick_list_template.docx"
    document = MailMerge(template)
    document.merge(
        PONumber = managerData["purchase_order"],
        Date = str(datetime.now().date()),
        Destination = str(managerData["ship_to_location"])
    )
    items = []
    for idx, item in enumerate(managerData["items"]):
        if "bundle_items" in item["details"].keys() and len(item["details"]["bundle_items"]):
            for bundle_item in item["details"]["bundle_items"]:
                items.append({
                    "ASIN": str(item["details"]["asin"]),
                    "ItemDescription": str(bundle_item["name"]),
                    "Quantity": str(int(bundle_item["quantity"]*item["quantity"])),
                    "SKU": str(bundle_item["sku"]),
                })
        else:
            items.append({
                "ASIN": str(item["details"]["asin"]),
                "ItemDescription": str(item["details"]["name"]),
                "Quantity": str(item["quantity"]),
                "SKU": str(item["details"]["master_sku"]),
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

def barcodeGenerator(managerData):
    items = []
    for idx, item in enumerate(managerData["items"]):
        items.append({
            "Item No": idx+1,
            "ASIN": str(item["details"]["asin"]),
            "ItemDescription": str(item["details"]["name"]),
            "Quantity": item["quantity"],
            "MRP": item["unit_cost"],
        })

    df = pd.DataFrame(items)

    filename = managerData["purchase_order"] + "_Barcode"
    folder_path = "Uploads/" + managerData["purchase_order"].split("_")[0]
    if not os.path.isdir(folder_path):
        os.makedirs(folder_path)
    file_path = folder_path + "/" + filename +".xlsx"
    
    df.to_excel(file_path, index=False)
    url = managerData["purchase_order"].split("_")[0] + "/" + filename + ".docx"
    return url
