"""MODELS - ENTERPRISE - CREATE
Enterprise Create model. Inherits from EnterpriseUpdate, but all the required fields must be re-defined
"""

# # Native # #
from typing import Optional

# # Package # #
from .enterprise_update import EnterpriseUpdate
from .address import Address
from .fields import EnterpriseFields

__all__ = ("EnterpriseCreate",)


class EnterpriseCreate(EnterpriseUpdate):
    """Body of Enterprise POST requests"""
    name: str = EnterpriseFields.name
    email: str = EnterpriseFields.email
    phone: str = EnterpriseFields.phone
    website: str = EnterpriseFields.website
    GSTIN: str = EnterpriseFields.GSTIN
    address: Address = EnterpriseFields.address
    billed: bool = EnterpriseFields.billed
    bank_name: Optional[str] = EnterpriseFields.bank_name
    account_number: Optional[str] = EnterpriseFields.account_number
    ifsc: Optional[str] = EnterpriseFields.ifsc
    branch_name: Optional[str] = EnterpriseFields.branch_name
    