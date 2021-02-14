"""MODELS - ASIN INFO - READ
AsinInfo Read model. Inherits from AsinInfoCreate and adds the id field, which is the _id field on Mongo documents
"""

# # Native # #
from datetime import datetime
from typing import Optional, List

# # Installed # #
import pydantic
from dateutil.relativedelta import relativedelta

# # Package # #
from .asin_info_create import AsinInfoCreate
from .fields import AsinFields

__all__ = ("AsinInfoRead", "AsinInfosRead")


class AsinInfoRead(AsinInfoCreate):
    """Body of AsinInfo GET and POST responses"""
    id: str = AsinFields._id
    created: int = AsinFields.created
    updated: int = AsinFields.updated

    @pydantic.root_validator(pre=True)
    def _set_purchase_id(cls, data):
        """Swap the field _id to id (this could be done with field alias, by setting the field as "_id"
        and the alias as "id", but can be quite confusing)"""
        document_id = data.get("_id")
        if document_id:
            data["id"] = document_id
        return data

    class Config(AsinInfoCreate.Config):
        extra = pydantic.Extra.ignore  # if a read document has extra fields, ignore them


AsinInfosRead = List[AsinInfoRead]
