"""MODELS - Bundle Items
The Bundle Items of a purchase order is part of the Items model
"""

from typing import List

# # Package # #
from .common import BaseModel
from .fields import BundleItemsFields

__all__ = ("BundleItem", "BundleItems")


class BundleItem(BaseModel):
    """The BundleItem information of a purchase order"""
    sku: str = BundleItemsFields.sku
    name: str = BundleItemsFields.name
    quantity: str = BundleItemsFields.quantity
    
BundleItems = List[BundleItem]