"""MODELS - ENTERPRISE - UPDATE
Enterprise Update model. All attributes are set as Optional, as we use the PATCH method for update
(in which only the attributes to change are sent on request body)
"""

# # Native # #
from datetime import date
from typing import Optional
from contextlib import suppress

# # Package # #
from .common import BaseModel
from .fields import EnterpriseFields
from .address import Address

__all__ = ("EnterpriseUpdate",)


class EnterpriseUpdate(BaseModel):
    """Body of Enterprise PATCH requests"""
    name: Optional[str] = EnterpriseFields.name
    email: Optional[str] = EnterpriseFields.email
    phone: Optional[str] = EnterpriseFields.phone
    website: Optional[str] = EnterpriseFields.website
    GSTIN: Optional[str] = EnterpriseFields.GSTIN
    address: Optional[Address] = EnterpriseFields.address_update
    billing: bool = EnterpriseFields.billing
    bank_name: Optional[str] = EnterpriseFields.bank_name
    account_number: Optional[str] = EnterpriseFields.account_number
    ifsc: Optional[str] = EnterpriseFields.ifsc
    branch_name: Optional[str] = EnterpriseFields.branch_name
    