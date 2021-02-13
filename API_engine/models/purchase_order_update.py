"""MODELS - PURCHASE ORDER - UPDATE
PurchaseOrder Update model. All attributes are set as Optional, as we use the PATCH method for update
(in which only the attributes to change are sent on request body)
"""

# # Native # #
from typing import Optional

# # Package # #
from .common import BaseModel
from .fields import PurchaseOrderFields
from .items import Items

__all__ = ("PurchaseOrderUpdate",)


class PurchaseOrderUpdate(BaseModel):
    """Body of PurchaseOrder PATCH requests"""
    tracking_id: Optional[str] = PurchaseOrderFields.tracking_id
    return_status: Optional[str] = PurchaseOrderFields.return_status
    order_status: Optional[str] = PurchaseOrderFields.order_status
    completed_status: Optional[bool] = PurchaseOrderFields.completed_status
    