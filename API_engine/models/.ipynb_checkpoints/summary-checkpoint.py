"""MODELS - Summary
The Summary of a purchase order
"""

from typing import List, Optional


# # Installed # #
import pydantic

# # Package # #
from .common import BaseModel
from .fields import AsinFields, SummaryFields, ItemsFields
from .bundleItems import BundleItems

__all__ = ("Summary", "SummaryItems", "SummaryItem")

class SummaryItem(BaseModel):
    """The item information of a purchase summary"""
    asin: str = AsinFields.asin
    name: str = AsinFields.name
    qty: str = ItemsFields.quantity
    sku: str = AsinFields.master_sku
    
SummaryItems = List[SummaryItem]

class Summary(BaseModel):
    """Body of Summary POST requests"""
    purchase_order: str = SummaryFields.po
    items: SummaryItems = SummaryFields.items
    destination: str = SummaryFields.destination   
