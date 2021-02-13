"""MODELS - AsinInfos
The AsinInfos of a purchase order is part of the PurchaseOrder model
"""

from typing import List, Optional


# # Installed # #
import pydantic

# # Package # #
from .common import BaseModel
from .fields import AsinFields
from .bundleItems import BundleItems

__all__ = ("AsinInfo",)


class AsinInfo(BaseModel):
    """The AsinInfo information of a item of an purchase order"""
    asin: str = AsinFields.asin
    inventory: str = AsinFields.inventory
    master_sku: str = AsinFields.master_sku
    name: str = AsinFields.name
    hsn: str = AsinFields.hsn
    bundle_item: Optional[BundleItems] = AsinFields.bundle_item 
    our_cost: str = AsinFields.our_cost
    
    @pydantic.root_validator(pre=True)
    def _set_bundle_item(cls, data):
        """Calculate the current age of the user from the date of birth, if any"""
        bundle_item = data.get("bundle_item")
        if not bundle_item:
            data["bundle_item"] = None
        return data
