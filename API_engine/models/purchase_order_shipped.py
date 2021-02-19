"""MODELS - PURCHASE ORDER SHIPPED- UPDATE
PurchaseOrderItem Update model. 
"""

# # Native # #
from typing import List, Dict

# # Package # #
from .common import BaseModel
from .fields import PurchaseOrderItemFields, ItemsFields
from .items import Items

__all__ = ("PurchaseOrderShipped", "Shipped")

class Shipped(BaseModel):
    asin_id: str = ItemsFields.asin_id
    quantity: float = ItemsFields.quantity
    
class PurchaseOrderShipped(BaseModel):
    """Body of PurchaseOrder POST requests"""
    purchase_order: str = PurchaseOrderItemFields.purchase_order
    update: List[Shipped] = PurchaseOrderItemFields.update