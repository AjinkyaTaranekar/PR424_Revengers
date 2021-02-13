"""MODELS - Items
The Items of a purchase order is part of the PurchaseOrder model
"""

from typing import List, Optional


# # Installed # #
import pydantic

# # Package # #
from .common import BaseModel
from .fields import ItemsFields
from .asin_info import AsinInfo

__all__ = ("Item", "Items")


class Item(BaseModel):
    """The item information of a purchase order"""
    unit_cost: str = ItemsFields.unit_cost
    quantity: str = ItemsFields.quantity
    shipped: bool = ItemsFields.shipped
    stock: bool = ItemsFields.stock
    details: AsinInfo = ItemsFields.details

Items = List[Item]