"""MODELS - ASIN INFO - UPDATE
AsinInfo Update model. All attributes are set as Optional, as we use the PATCH method for update
(in which only the attributes to change are sent on request body)
"""

# # Native # #
from typing import Optional

# # Package # #
from .common import BaseModel
from .fields import AsinFields
from .bundleItems import BundleItems

__all__ = ("AsinInfoUpdate",)


class AsinInfoUpdate(BaseModel):
    """Body of AsinInfo PATCH requests"""
    inventory: Optional[str] = AsinFields.inventory
    master_sku: Optional[str] = AsinFields.master_sku
    name: Optional[str] = AsinFields.name
    hsn: Optional[str] = AsinFields.hsn
    bundle_items: Optional[BundleItems] = AsinFields.bundle_items
    our_cost: Optional[str] = AsinFields.our_cost
    