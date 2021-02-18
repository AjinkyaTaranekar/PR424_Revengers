"""MODELS - AsinInfos
The AsinInfos of a purchase order is part of the PurchaseOrder model
"""

from typing import List, Optional


# # Installed # #
import pydantic

# # Package # #
from .fields import AsinFields
from .bundleItems import BundleItems
from .asin_info_update import AsinInfoUpdate

__all__ = ("AsinInfoCreate",)


class AsinInfoCreate(AsinInfoUpdate):
    """The AsinInfo information of a item of an purchase order"""
    asin: str = AsinFields.asin
    inventory: int = AsinFields.inventory
    master_sku: str = AsinFields.master_sku
    name: str = AsinFields.name
    hsn: str = AsinFields.hsn
    bundle_items: Optional[BundleItems] = AsinFields.bundle_items
    our_cost: float = AsinFields.our_cost
    id: str = AsinFields._id
    created: int = AsinFields.created
    updated: int = AsinFields.updated

    @pydantic.root_validator(pre=True)
    def _set_bundle_item(cls, data):
        bundle_item = data.get("bundle_items")
        if not bundle_item:
            data["bundle_items"] = None
        return data
    
    
    
    