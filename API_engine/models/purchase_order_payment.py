"""MODELS - PURCHASE ORDER PAYMENT- UPDATE
PurchaseOrderItem Update model. 
"""

# # Native # #
from typing import List, Dict

# # Package # #
from .common import BaseModel
from .fields import PurchaseOrderPaymentFields, ItemsFields, PurchaseOrderItemFields
from .items import Items

__all__ = ("PurchaseOrderPayment", "Payment")

class Payment(BaseModel):
    date: str = PurchaseOrderPaymentFields.date
    amount: float = PurchaseOrderPaymentFields.amount
    
class PurchaseOrderPayment(BaseModel):
    """Body of PurchaseOrder POST requests"""
    purchase_order: str = PurchaseOrderItemFields.purchase_order
    update: List[Payment] = PurchaseOrderItemFields.update