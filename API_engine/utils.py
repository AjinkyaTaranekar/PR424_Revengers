"""UTILS
Misc helpers/utils functions
"""

# # Native # #
from time import time
from uuid import uuid4
from typing import Union
import pandas as pd
import json


# # Package # #
from .database import admin, manager

__all__ = ("get_time", "get_uuid", "adminFilesProcessing", "managerFilesProcessing")


def get_time(seconds_precision=True) -> Union[int, float]:
    """Returns the current time as Unix/Epoch timestamp, seconds precision by default"""
    return time() if not seconds_precision else int(time())


def get_uuid() -> str:
    """Returns an unique UUID (UUID4)"""
    return str(uuid4())

def adminFilesProcessing(path,export_channel,export_item,pricing):
    """Admin Files are Processed here"""
    # Pricing file
    pri = pd.read_excel(path+pricing)
    pri.columns = pri.iloc[3]
    pri = pri.drop(pri.index[0])
    pri = pri.drop(pri.index[0])
    pri = pri.drop(pri.index[0])
    pri = pri.drop(pri.index[0])

    # Export Channel Item Type
    eci = pd.read_csv(path+export_channel, engine ='python')
    eci = eci[~eci["Channel Name"].str.contains("FLIPKART")]
    
    # Export Item Master
    eim = pd.read_csv(path+export_item, engine ='python')

    adminFile = pd.DataFrame(columns= ["asin", "master_sku" "sku", "name", "our_cost", "inventory"])
    for i in range(len(eci)):
        adminFile.at[i,"asin"] = eci.iloc[i]["Channel Product Id"]
        adminFile.at[i,"master_sku"] = eci.iloc[i]["Uniware Sku Code"]
        adminFile.at[i,"inventory"] = eci.iloc[i]["Next Inventory Update"]

    for i in range(len(adminFile)):
        adminFile.at[i,"our_cost"] = pri.loc[pri['ASIN'] == adminFile.at[i,"asin"]]['Cost'].values
        adminFile.at[i,"our_cost"] = adminFile.at[i,"our_cost"][0] if len(adminFile.at[i,"our_cost"]) else 0
        sku = adminFile.at[i,"master_sku"]
        data = eim.loc[eim['Product Code'] == sku]
        adminFile.at[i,"name"] = data["Name"].values[0] if len(data["Name"].values) else "NA" 
        if len(data["Type"].values) and data["Type"].values[0] == "BUNDLE":
            adminFile.at[i,"sku"] = ', '.join(data["Component Product Code"].values)

    adminData = adminFile.to_dict(orient='records')

    # Inserting data to admin database
    for data in adminData:
        asin = data["asin"]
        if admin.find_one({"asin": asin}):
            admin.update_one({"asin": asin}, {"$set": data})
        else:
            admin.insert_one(data)     

def managerFilesProcessing(path,purchase, quantity):
    """Manager Files are Processed here"""
    # Getting Purchase Order
    poi = pd.read_excel(path + purchase)
    po = poi.groupby(["PO"])[['ASIN', 'Unit Cost', 'Quantity Requested']].apply(lambda g: list(map(tuple, g.values.tolist()))).to_dict()
    
    # Fetching Admin data from database 
    adminFile = pd.DataFrame(list(admin.find()))

    managerData = []
    for k in po:
        database = {}
        database["_id"] = get_uuid()
        database["purchase_order"] = k
        database["tracking_id"] = "NA"
        database["return_status"] = "NA"
        database["created"] = database["updated"] = get_time() 
        database["items"] = []
        for data in po[k]:
            adminData = adminFile.loc[adminFile['asin'] == data[0]]
            database["items"].append({
                "asin": data[0],
                "unit_cost": data[1],
                "quantity": data[2],
                "name": adminData["name"].values[0] if len(adminData["name"]) else "NA",
                "inventory": adminData["inventory"].values[0] if len(adminData["inventory"]) else "NA",
                "master_sku" : adminData["master_sku"].values[0] if len(adminData["master_sku"]) else "NA",
                "sku": adminData["sku"].values[0] if len(adminData["sku"]) else "NA",
                "our_cost": adminData["our_cost"].values[0] if len(adminData["our_cost"]) else "NA"
            })
        managerData.append(database)
    managerData
    
    # Inserting Manager data to database 
    manager.insert_many(managerData)