"""MODELS - ENTERPRISE - READ
PurchaseOrder Read model. Inherits from PurchaseOrderCreate and adds the purchaseOrder_id field, which is the _id field on Mongo documents
"""

# # Native # #
from datetime import datetime
from typing import Optional, List

# # Installed # #
import pydantic
from dateutil.relativedelta import relativedelta

# # Package # #
from .purchase_order_create import PurchaseOrderCreate
from .fields import PurchaseOrderFields

__all__ = ("PurchaseOrderRead", "PurchaseOrdersRead")


class PurchaseOrderRead(PurchaseOrderCreate):
    """Body of PurchaseOrder GET and POST responses"""
    purchase_id: str = PurchaseOrderFields.purchase_id
    created: int = PurchaseOrderFields.created
    updated: int = PurchaseOrderFields.updated

    @pydantic.root_validator(pre=True)
    def _set_purchase_id(cls, data):
        """Swap the field _id to purchaseOrder_id (this could be done with field alias, by setting the field as "_id"
        and the alias as "purchaseOrder_id", but can be quite confusing)"""
        document_id = data.get("_id")
        if document_id:
            data["purchase_id"] = document_id
        return data

    class Config(PurchaseOrderCreate.Config):
        extra = pydantic.Extra.ignore  # if a read document has extra fields, ignore them


PurchaseOrdersRead = List[PurchaseOrderRead]
