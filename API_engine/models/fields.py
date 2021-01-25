"""MODELS - FIELDS
Definition of Fields used on model classes attributes.
We define them separately because the UserUpdate and UserCreate models need to re-define their attributes,
as they change from Optional to required.
Address could define its fields on the model itself, but we define them here for convenience
"""

# # Installed # #
from pydantic import Field

# # Package # #
from ..utils import get_time, get_uuid

__all__ = ("UserFields", "AddressFields")

_string = dict(min_length=1)
"""Common attributes for all String fields"""
_unix_ts = dict(example=get_time())
"""Common attributes for all Unix timestamp fields"""


class UserFields:
    name = Field(
        description="Full name of this user",
        example="John Doe",
        **_string
    )
    email = Field(
        description="Email of this user",
        example="johndoe@robotbanao.com",
        **_string
    )
    password = Field(
        description="Password of this user",
        example="**********",
        **_string
    )
    role = Field(
        description="Role of this user",
        example="Admin",
        **_string
    )
    address = Field(
        description="Address object where this user live"
    )
    address_update = Field(
        description=f"{address.description}. When updating, the whole Address object is required, as it gets replaced"
    )
    user_id = Field(
        description="Unique identifier of this user in the database",
        example=get_uuid(),
        min_length=36,
        max_length=36
    )
    """The user_id is the _id field of Mongo documents, and is set on UserRepository.create"""

    created = Field(
        alias="created",
        description="When the user was registered (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on UserRepository.create"""
    updated = Field(
        alias="updated",
        description="When the user was updated for the last time (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on UserRepository.update (and initially on create)"""


class AddressFields:
    street = Field(
        description="Main address line",
        example="141, Navlakha",
        **_string
    )
    city = Field(
        description="City",
        example="Indore",
        **_string
    )
    state = Field(
        description="State, province and/or region",
        example="Madhya Pradesh",
        **_string
    )
    zip_code = Field(
        description="Postal/ZIP code",
        example="452005",
        **_string
    )
