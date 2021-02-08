"""MODELS - PURCHASE ORDER STATUS- UPDATE
PurchaseOrderStatus Update model. 
"""

# # Native # #
from typing import List

# # Package # #
from .common import BaseModel
from .fields import PurchaseOrderStatusFields
from .items import Items

__all__ = ("PurchaseOrderStatusUpdate",)


class PurchaseOrderStatusUpdate(BaseModel):
    """Body of PurchaseOrder PATCH requests"""
    purchase_order: str = PurchaseOrderStatusFields.purchase_order
    status: str = PurchaseOrderStatusFields.status
    asins: List[str] = PurchaseOrderStatusFields.asins