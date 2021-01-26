"""DATABASE
MongoDB database initialization
"""

# # Installed # #
from pymongo import MongoClient
from pymongo.collection import Collection

# # Package # #
from .settings import mongo_settings as settings

__all__ = ("client", "collection")

client = MongoClient(settings.uri)
users: Collection = client[settings.database][settings.users]
enterprises: Collection = client[settings.database][settings.enterprises]