"""REPOSITORIES
Methods to interact with the database
"""

# # Installed # #
import bcrypt

# # Package # #
from .models import *
from .exceptions import *
from .database import users, enterprises
from .utils import get_time, get_uuid

# # Native # #
from datetime import datetime
import shutil
import os

__all__ = ("UsersRepository","EnterpriseRepository","FileRepository",)


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
    def adminUpload(file):
        """Files uploaded by admin"""
        with open("Uploads/admin/"+file.filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
    @staticmethod
    def managerUpload(purchase, quantity):
        """Files uploaded by manager"""
        today = datetime.now()
        folder_path = "Uploads/manager/" + today.strftime('%d-%m-%Y %H-%M-%S') 
        
        if not os.path.isdir(folder_path):
            os.mkdir(folder_path)
        
        with open(folder_path+"/"+purchase.filename, "wb") as buffer:
            shutil.copyfileobj(purchase.file, buffer)
        
        with open(folder_path+"/"+quantity.filename, "wb") as buffer:
            shutil.copyfileobj(quantity.file, buffer)
        