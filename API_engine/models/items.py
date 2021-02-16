"""MODELS - Items
The Items of a purchase order is part of the PurchaseOrder model
"""

from typing import List, Optional


# # Installed # #
import pydantic

# # Package # #
from .common import BaseModel
from .fields import ItemsFields
from .asin_info_create import AsinInfoCreate

__all__ = ("Item", "Items")


class Item(BaseModel):
    """The item information of a purchase order"""
    asin_id: str = ItemsFields.asin_id
    unit_cost: float = ItemsFields.unit_cost
    quantity: str = ItemsFields.quantity
    shipped: bool = ItemsFields.shipped
    stock: bool = ItemsFields.stock
    details: AsinInfoCreate = ItemsFields.details

Items = List[Item]