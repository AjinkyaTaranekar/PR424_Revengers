"""MODELS - ENTERPRISE - READ
Enterprise Read model. Inherits from EnterpriseCreate and adds the enterprise_id field, which is the _id field on Mongo documents
"""

# # Native # #
from datetime import datetime
from typing import Optional, List

# # Installed # #
import pydantic
from dateutil.relativedelta import relativedelta

# # Package # #
from .enterprise_create import EnterpriseCreate
from .fields import EnterpriseFields

__all__ = ("EnterpriseRead", "EnterprisesRead")


class EnterpriseRead(EnterpriseCreate):
    """Body of Enterprise GET and POST responses"""
    enterprise_id: str = EnterpriseFields.enterprise_id
    created: int = EnterpriseFields.created
    updated: int = EnterpriseFields.updated

    @pydantic.root_validator(pre=True)
    def _set_enterprise_id(cls, data):
        """Swap the field _id to enterprise_id (this could be done with field alias, by setting the field as "_id"
        and the alias as "enterprise_id", but can be quite confusing)"""
        document_id = data.get("_id")
        if document_id:
            data["enterprise_id"] = document_id
        return data

    class Config(EnterpriseCreate.Config):
        extra = pydantic.Extra.ignore  # if a read document has extra fields, ignore them


EnterprisesRead = List[EnterpriseRead]
