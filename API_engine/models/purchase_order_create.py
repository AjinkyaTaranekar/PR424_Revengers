"""MODELS - PURCHASE ORDER - CREATE
PurchaseOrder Create model. Inherits from PurchaseOrderUpdate, but all the required fields must be re-defined
"""

# # Native # #
from typing import List

# # Package # #
from .purchase_order_update import PurchaseOrderUpdate
from .fields import PurchaseOrderFields
from .items import Items

__all__ = ("PurchaseOrderCreate",)


class PurchaseOrderCreate(PurchaseOrderUpdate):
    """Body of PurchaseOrder POST requests"""
    purchase_order: str = PurchaseOrderFields.purchase_order
    tracking_id: str = PurchaseOrderFields.tracking_id
    return_status: str = PurchaseOrderFields.return_status
    order_status: str = PurchaseOrderFields.order_status
    completed_status: bool = PurchaseOrderFields.completed_status
    items: Items = PurchaseOrderFields.items
    ship_to_location: str = PurchaseOrderFields.ship_to_location
    box: List[str] = PurchaseOrderFields.box
    total_amt: int = PurchaseOrderFields.total_amt
    invoice : List[str]  = PurchaseOrderFields.invoice
    appt_date : str  = PurchaseOrderFields.appt_date
    appt_notes: str  = PurchaseOrderFields.appt_notes