"""MODELS - PURCHASE ORDER - UPDATE
PurchaseOrder Update model. All attributes are set as Optional, as we use the PATCH method for update
(in which only the attributes to change are sent on request body)
"""

# # Native # #
from typing import Optional,List

# # Package # #
from .common import BaseModel
from .fields import PurchaseOrderFields
from .items import Items

__all__ = ("PurchaseOrderUpdate",)


class PurchaseOrderUpdate(BaseModel):
    """Body of PurchaseOrder PATCH requests"""
    tracking_id: Optional[str] = PurchaseOrderFields.tracking_id
    return_status: Optional[bool] = PurchaseOrderFields.return_status
    order_status: Optional[str] = PurchaseOrderFields.order_status
    eway: Optional[str] = PurchaseOrderFields.eway
    awb: Optional[str] = PurchaseOrderFields.awb
    completed_status: Optional[bool] = PurchaseOrderFields.completed_status
    box: Optional[List[str]] = PurchaseOrderFields.box
    total_amt: Optional[int] = PurchaseOrderFields.total_amt
    invoice : Optional[List[str]]  = PurchaseOrderFields.invoice
    appt_date : Optional[str] = PurchaseOrderFields.appt_date
    pod : Optional[str] = PurchaseOrderFields.pod
    appt_notes: Optional[str] = PurchaseOrderFields.appt_notes
    