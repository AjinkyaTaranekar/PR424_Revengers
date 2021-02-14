"""REPOSITORIES
Methods to interact with the database
"""

# # Installed # #
import bcrypt
from bson.objectid import ObjectId

# # Package # #
from .models import *
from .exceptions import *
from .database import users, enterprises, manager, admin
from .utils import get_time, get_uuid, adminFilesProcessing, managerFilesProcessing, invoiceGenerator, summaryGenerator, pickListGenerator

# # Native # #
from datetime import datetime
import shutil
import os

__all__ = ("UsersRepository","EnterpriseRepository","FileRepository", "PurchaseOrderRepository", "InvoiceRepository", "SummaryRepository", "PickListRepository", "InventoryRepository")


class UsersRepository:
    @staticmethod
    def get(user_id: str) -> UserRead:
        """Retrieve a single User by its unique id"""
        document = users.find_one({"_id": user_id})
        if not document:
            raise UserNotFoundException(user_id)
        return UserRead(**document)
    
    @staticmethod
    def login(email: str, password: str):
        """Retrieve a single User by its unique id"""
        document = users.find_one({"email": email})
        if not document:
            raise UserNotFoundException(email)
        if bcrypt.hashpw(password.encode('utf-8'), document['password']) != document['password']:
            raise InvalidUserPasswordException(email)
        return {
            "role": document["role"],
            "email": document["email"]
            }

    @staticmethod
    def list() -> UsersRead:
        """Retrieve all the available users"""
        cursor = users.find()
        return [UserRead(**document) for document in cursor]

    @staticmethod
    def create(create: UserCreate) -> UserRead:
        """Create a user and return its Read object"""
        document = create.dict()
        document["created"] = document["updated"] = get_time()
        document["_id"] = get_uuid()
        document["password"] = bcrypt.hashpw(document["password"].encode('utf-8'), bcrypt.gensalt())

        # The time and id could be inserted as a model's Field default factory,
        # but would require having another model for Repository only to implement it

        result = users.insert_one(document)
        assert result.acknowledged

        return UsersRepository.get(result.inserted_id)

    @staticmethod
    def update(user_id: str, update: UserUpdate):
        """Update a user by giving only the fields to update"""
        document = update.dict()
        document["updated"] = get_time()

        result = users.update_one({"_id": user_id}, {"$set": document})
        if not result.modified_count:
            raise UserNotFoundException(identifier=user_id)

    @staticmethod
    def delete(user_id: str):
        """Delete a user given its unique id"""
        result = users.delete_one({"_id": user_id})
        if not result.deleted_count:
            raise UserNotFoundException(identifier=user_id)

class EnterpriseRepository:
    @staticmethod
    def get(enterprise_id: str) -> EnterpriseRead:
        """Retrieve a single Enterprise by its unique id"""
        document = enterprises.find_one({"_id": enterprise_id})
        if not document:
            raise EnterpriseNotFoundException(enterprise_id)
        return EnterpriseRead(**document)
    
    @staticmethod
    def list() -> EnterprisesRead:
        """Retrieve all the available enterprises"""
        cursor = enterprises.find()
        return [EnterpriseRead(**document) for document in cursor]

    @staticmethod
    def create(create: EnterpriseCreate) -> EnterpriseRead:
        """Create a enterprise and return its Read object"""
        document = create.dict()
        document["created"] = document["updated"] = get_time()
        document["_id"] = get_uuid()
        
        # The time and id could be inserted as a model's Field default factory,
        # but would require having another model for Repository only to implement it

        result = enterprises.insert_one(document)
        assert result.acknowledged

        return EnterpriseRepository.get(result.inserted_id)

    @staticmethod
    def update(enterprise_id: str, update: EnterpriseUpdate):
        """Update a enterprise by giving only the fields to update"""
        document = update.dict()
        document["updated"] = get_time()

        result = enterprises.update_one({"_id": enterprise_id}, {"$set": document})
        if not result.modified_count:
            raise EnterpriseNotFoundException(identifier=enterprise_id)

    @staticmethod
    def delete(enterprise_id: str):
        """Delete a enterprise given its unique id"""
        result = enterprises.delete_one({"_id": enterprise_id})
        if not result.deleted_count:
            raise EnterpriseNotFoundException(identifier=enterprise_id)

class FileRepository:
    @staticmethod
    def adminUpload(export_channel,export_item,pricing):
        """Files uploaded by admin"""
        path = "Uploads/admin/"
        with open(path + export_channel.filename, "wb") as buffer:
            shutil.copyfileobj(export_channel.file, buffer)
        with open(path + export_item.filename, "wb") as buffer:
            shutil.copyfileobj(export_item.file, buffer)
        with open(path + pricing.filename, "wb") as buffer:
            shutil.copyfileobj(pricing.file, buffer)
        adminFilesProcessing(path,export_channel.filename,export_item.filename,pricing.filename)
        
    @staticmethod
    def managerUpload(purchase, quantity):
        """Files uploaded by manager"""
        today = datetime.now()
        folder_path = "Uploads/manager/" + today.strftime('%d-%m-%Y %H-%M-%S') + "/"
        
        if not os.path.isdir(folder_path):
            os.mkdir(folder_path)
        
        with open(folder_path + purchase.filename, "wb") as buffer:
            shutil.copyfileobj(purchase.file, buffer)
        
        if quantity:
            with open(folder_path + quantity.filename, "wb") as buffer:
                shutil.copyfileobj(quantity.file, buffer)
            managerFilesProcessing(folder_path,purchase.filename, quantity.filename)
        else:
            managerFilesProcessing(folder_path,purchase.filename)
        

class InventoryRepository:
    @staticmethod
    def get(asin_id: str) -> AsinInfoRead:
        """Retrieve a single Asin by its unique id"""
        document = admin.find_one({"_id": asin_id})
        if not document:
            raise AsinInfoNotFoundException(asin_id)
        return AsinInfoRead(**document)
    
    @staticmethod
    def list() -> AsinInfoRead:
        """Retrieve all the available asins"""
        cursor = admin.find()
        return [AsinInfoRead(**document) for document in cursor]

    @staticmethod
    def create(create: AsinInfoCreate) -> AsinInfoRead:
        """Create a asin and return its Read object"""
        document = create.dict()
        document["created"] = document["updated"] = get_time()
        document["_id"] = get_uuid()
        
        # The time and id could be inserted as a model's Field default factory,
        # but would require having another model for Repository only to implement it

        result = admin.insert_one(document)
        assert result.acknowledged

        return InventoryRepository.get(result.inserted_id)

    @staticmethod
    def update(asin_id: str, update: AsinInfoUpdate):
        """Update a asin by giving only the fields to update"""
        document = update.dict()
        document["updated"] = get_time()

        result = admin.update_one({"_id": asin_id}, {"$set": document})
        if not result.modified_count:
            raise AsinInfoNotFoundException(identifier=asin_id)

    @staticmethod
    def delete(asin_id: str):
        """Delete a asin given its unique id"""
        result = admin.delete_one({"_id": asin_id})
        if not result.deleted_count:
            raise AsinInfoNotFoundException(identifier=asin_id)
            
class PurchaseOrderRepository:
    @staticmethod
    def get(purchaseOrder: str) -> PurchaseOrderRead:
        """Retrieve a single PurchaseOrder by its unique id"""
        document = manager.find_one({"purchase_order": purchaseOrder})
        for items in document['items']: 
            items['details'] = InventoryRepository.get(items['asin_id'])
            #print(admin.find_one({"_id": items['asin_id']}))
        if not document:
            raise PurchaseOrderNotFoundException(purchaseOrder)
        return PurchaseOrderRead(**document)
    
    @staticmethod
    def list() -> PurchaseOrdersRead:
        """Retrieve all the available purchaseOrders"""
        cursor = manager.find()
        documents = []
        for document in cursor:
            for items in document['items']: 
                items['details'] = InventoryRepository.get(items['asin_id'])
                #print(InventoryRepository.get(items['asin_id']))
            documents.append(document)
        #print(documents)    
        return [PurchaseOrderRead(**document) for document in documents]

    @staticmethod
    def update(purchaseOrder: str, update: PurchaseOrderUpdate):
        """Update a purchaseOrder by giving only the fields to update"""
        document = update.dict()
        document["updated"] = get_time()

        result = manager.update_one({"purchase_order": purchaseOrder}, {"$set": document})
        if not result.modified_count:
            raise PurchaseOrderNotFoundException(identifier=purchaseOrder)
    
    @staticmethod
    def updateItemStatus(update: PurchaseOrderUpdate):
        """Update a purchaseOrder item status by giving asins to update"""
        update = update.dict()
        updated = get_time()
        
        managerData = manager.find_one({"purchase_order": update["purchase_order"]})
        if not managerData:
            raise PurchaseOrderNotFoundException(update["purchase_order"])
        
        for asin in update["asins"]:
            result = manager.update_one({"purchase_order": update["purchase_order"], "items.details.asin": asin}, {"$set": {"items.$." + update["status"]: True}})

        result = manager.update_one({"purchase_order": update["purchase_order"]}, {"$set": {"updated": updated}})
        

class InvoiceRepository:
    @staticmethod
    def getInvoice(InvoiceData: Invoice):
        """Retrieve a single Invoice by its purchaseOrder and enterpriseNumber"""
        InvoiceData = InvoiceData.dict()
        
        managerData = manager.find_one({"purchase_order": InvoiceData["purchase_order"]})
        if not managerData:
            raise PurchaseOrderNotFoundException(InvoiceData["purchase_order"])
        
        enterpriseData = enterprises.find_one({"_id": InvoiceData["billed_from_id"]})
        if not enterpriseData:
            raise EnterpriseNotFoundException(InvoiceData["billed_from_id"])
        
        enterpriseToData = enterprises.find_one({"_id": InvoiceData["billed_to_id"]})
        if not enterpriseToData:
            raise EnterpriseNotFoundException(InvoiceData["billed_to_id"])

        customer_path = invoiceGenerator(managerData,enterpriseData,enterpriseToData,"customer")
        seller_path = invoiceGenerator(managerData,enterpriseData,enterpriseToData,"seller")
        transporter_path = invoiceGenerator(managerData,enterpriseData,enterpriseToData,"transporter")
        return [customer_path, seller_path, transporter_path]

class SummaryRepository:
    @staticmethod
    def getSummary(SummaryData: Summary):
        """Retrieve a summary"""
        summary = SummaryData.dict()
        summary_path = summaryGenerator(summary)
        return summary_path

class PickListRepository:
    @staticmethod
    def getPickList(purchase_order: str):
        """Retrieve a PickList by its purchaseOrder"""
        managerData = manager.find_one({"purchase_order": purchase_order})
        if not managerData:
            raise PurchaseOrderNotFoundException(purchase_order)
        
        pick_list_path = pickListGenerator(managerData)
        return pick_list_path
