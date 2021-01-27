"""MODELS - Items
The Items of a purchase order is part of the PurchaseOrder model
"""

from typing import List

# # Package # #
from .common import BaseModel
from .fields import ItemsFields

__all__ = ("Item", "Items")


class Item(BaseModel):
    """The item information of a purchase order"""
    asin: str = ItemsFields.asin
    name: str = ItemsFields.name
    inventory: str = ItemsFields.inventory
    master_sku: str = ItemsFields.master_sku
    sku: str = ItemsFields.sku
    unit_cost: str = ItemsFields.unit_cost
    our_cost: str = ItemsFields.our_cost
    quantity: str = ItemsFields.quantity
    
Items = List[Item]