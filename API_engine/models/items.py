"""MODELS - Items
The Items of a purchase order is part of the PurchaseOrder model
"""

from typing import List, Optional


# # Installed # #
import pydantic

# # Package # #
from .common import BaseModel
from .fields import ItemsFields
from .bundleItems import BundleItems

__all__ = ("Item", "Items")


class Item(BaseModel):
    """The item information of a purchase order"""
    asin: str = ItemsFields.asin
    name: str = ItemsFields.name
    hsn: str = ItemsFields.hsn
    shipped: bool = ItemsFields.shipped
    stock: bool = ItemsFields.stock
    inventory: str = ItemsFields.inventory
    master_sku: str = ItemsFields.master_sku
    bundle_item: Optional[BundleItems] = ItemsFields.bundle_item 
    unit_cost: str = ItemsFields.unit_cost
    our_cost: str = ItemsFields.our_cost
    quantity: str = ItemsFields.quantity

    @pydantic.root_validator(pre=True)
    def _set_bundle_item(cls, data):
        """Calculate the current age of the user from the date of birth, if any"""
        bundle_item = data.get("bundle_item")
        if not bundle_item:
            data["bundle_item"] = None
        return data

Items = List[Item]