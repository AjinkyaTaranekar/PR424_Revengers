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

    adminFile = pd.DataFrame(columns= ["ASIN", "SKU", "Name", "Our Cost", "Inventory"])
    for i in range(len(eci)):
        adminFile.at[i,"ASIN"] = eci.iloc[i]["Channel Product Id"]
        adminFile.at[i,"Master SKU"] = eci.iloc[i]["Uniware Sku Code"]
        adminFile.at[i,"Inventory"] = eci.iloc[i]["Next Inventory Update"]

    for i in range(len(adminFile)):
        adminFile.at[i,"Our Cost"] = pri.loc[pri['ASIN'] == adminFile.at[i,"ASIN"]]['Cost'].values
        adminFile.at[i,"Our Cost"] = adminFile.at[i,"Our Cost"][0] if len(adminFile.at[i,"Our Cost"]) else 0
        sku = adminFile.at[i,"Master SKU"]
        data = eim.loc[eim['Product Code'] == sku]
        adminFile.at[i,"Name"] = data["Name"].values[0] if len(data["Name"].values) else None 
        if len(data["Type"].values) and data["Type"].values[0] == "BUNDLE":
            adminFile.at[i,"SKU"] = ', '.join(data["Component Product Code"].values)

    adminData = adminFile.to_dict(orient='records')

    # Inserting data to admin database
    for data in adminData:
        asin = data["ASIN"]
        if admin.find_one({"ASIN": asin}):
            admin.update_one({"ASIN": asin}, {"$set": data})
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
        database["Purchase Order"] = k
        database["Items"] = []
        for data in po[k]:
            adminData = adminFile.loc[adminFile['ASIN'] == data[0]]
            database["Items"].append({
                "ASIN": data[0],
                "Unit Cost": data[1],
                "Quantity": data[2],
                "Name": adminData["Name"].values[0] if len(adminData["Name"]) else None,
                "Inventory": adminData["Inventory"].values[0] if len(adminData["Inventory"]) else None,
                "Master SKU" : adminData["Master SKU"].values[0] if len(adminData["Master SKU"]) else None,
                "SKU": adminData["SKU"].values[0] if len(adminData["SKU"]) else None,
                "Our Cost": adminData["Our Cost"].values[0] if len(adminData["Our Cost"]) else None
            })
        managerData.append(database)
    managerData
    
    # Inserting Manager data to database 
    manager.insert_many(managerData)