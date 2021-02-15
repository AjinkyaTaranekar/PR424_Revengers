"""MODELS - PURCHASE ORDER ITEM- UPDATE
PurchaseOrderItem Update model. 
"""

# # Native # #
from typing import List, Dict

# # Package # #
from .common import BaseModel
from .fields import PurchaseOrderItemFields, ItemsFields
from .items import Items

__all__ = ("PurchaseOrderItemUpdate", "Update")

class Update(BaseModel):
    asin_id: str = ItemsFields.asin_id
    unit_cost: str = ItemsFields.unit_cost
    
class PurchaseOrderItemUpdate(BaseModel):
    """Body of PurchaseOrder PATCH requests"""
    purchase_order: str = PurchaseOrderItemFields.purchase_order
    update: List[Update] = PurchaseOrderItemFields.update