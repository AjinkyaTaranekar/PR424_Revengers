"""MODELS - Invoice
The Invoice of a purchase order
"""

from typing import List, Optional


# # Installed # #
import pydantic

# # Package # #
from .common import BaseModel
from .fields import InvoiceFields

__all__ = ("Invoice",)

class Invoice(BaseModel):
    """Body of Invoice POST requests"""
    purchase_order: str = InvoiceFields.purchase_order
    billed_to_id: str = InvoiceFields.billed_to_id
    billed_from_id: str = InvoiceFields.billed_from_id   
