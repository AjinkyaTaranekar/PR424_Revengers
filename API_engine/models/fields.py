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

__all__ = ("UserFields", "AddressFields", "EnterpriseFields", "PurchaseOrderFields", "ItemsFields", )

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
    birth = Field(
        description="Date of birth, in format YYYY-MM-DD, or Unix timestamp",
        example="1999-12-31"
    )
    age = Field(
        description="Age of this user, if date of birth is specified",
        example=20
    )
    user_id = Field(
        description="Unique identifier of this user in the database",
        example=get_uuid(),
        min_length=36,
        max_length=36
    )
    """The user_id is the _id field of Mongo documents, and is set on UsersRepository.create"""

    created = Field(
        alias="created",
        description="When the user was registered (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on UsersRepository.create"""
    updated = Field(
        alias="updated",
        description="When the user was updated for the last time (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on UsersRepository.update (and initially on create)"""

class EnterpriseFields:
    name = Field(
        description="Full name of this enterprise",
        example="John Enterprise",
        **_string
    )
    email = Field(
        description="Email of this enterprise",
        example="john@johnenterprise.com",
        **_string
    )
    website = Field(
        description="Website of this enterprise",
        example="www.johnenterprise.com",
        **_string
    )
    phone = Field(
        description="Phone Number of this enterprise",
        example="XXXXXXXXXX",
        **_string
    )
    GSTIN = Field(
        description="GSTIN of this enterprise",
        example="XXXXXXXXXXXXXXXXX",
        **_string
    )
    billed = Field(
        description="Billing To/From Enterprise",
        example=True
    )
    bank_name = Field(
        description="Bank Name for this enterprise",
        example="HDFC",
        **_string
    )
    branch_name = Field(
        description="Bank Branch Name for this enterprise",
        example="Dewas Naka",
        **_string
    )
    account_number = Field(
        description="Account Number for this enterprise",
        example="210400222222412",
        **_string
    )
    ifsc = Field(
        description="Bank IFSC for this enterprise",
        example="HDFC214923",
        **_string
    )
    address = Field(
        description="Address object where this enterprise live"
    )
    address_update = Field(
        description=f"{address.description}. When updating, the whole Address object is required, as it gets replaced"
    )
    enterprise_id = Field(
        description="Unique identifier of this enterprise in the database",
        example=get_uuid(),
        min_length=36,
        max_length=36
    )
    """The enterprise_id is the _id field of Mongo documents, and is set on EnterpriseRepository.create"""

    created = Field(
        alias="created",
        description="When the enterprise was registered (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on UsersRepository.create"""
    updated = Field(
        alias="updated",
        description="When the enterprise was updated for the last time (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on UsersRepository.update (and initially on create)"""


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

class ItemsFields:
    asin = Field(
        description="ASIN of the Item",
        example="BP*********",
        **_string
    )
    name = Field(
        description="Name of the item",
        example="4 x Hub",
        **_string
    )
    hsn = Field(
        description="HSN of the item",
        example="8059",
        **_string
    )
    shipped = Field(
        description="Status of the item",
        example=False
    )
    inventory = Field(
        description="Inventory of Item",
        example="42",
        **_string
    )
    master_sku = Field(
        description="SKU provided to that item",
        example="ES-2434",
        **_string
    )
    bundle_item = Field(
        description="Sub item present in Items, if Bundled",
    )
    unit_cost = Field(
        description="Unit Cost of the product on Amazon",
        example="1000.0",
        **_string
    )
    our_cost = Field(
        description="Cost of the product",
        example="1200.0",
        **_string
    )
    quantity = Field(
        description="Quantity of the product requested",
        example="45",
        **_string
    )

class BundleItemsFields:
    sku = Field(
        description="SKU of the Item",
        example="RB-1324",
        **_string
    )
    name = Field(
        description="Name of the item",
        example="4 x Hub",
        **_string
    )
    quantity = Field(
        description="Quantity of Item",
        example="42",
        **_string
    )

class PurchaseOrderFields:
    purchase_id = Field(
        description="Unique identifier of this purchase in the database",
        example=get_uuid(),
        min_length=36,
        max_length=36
    )
    """The purchase_id is the _id field of Mongo documents, and is set on PurchaseRepository.create"""

    purchase_order = Field(
        description="Purchase Order of the purchase",
        example="XXXXXXXXX",
    )
    tracking_id = Field(
        description="Tracking ID of the purchase",
        example="XXXXXXXXX",
        **_string
    )
    ship_to_location = Field(
        description="Shipping Location of the purchase",
        example="Indore",
        **_string
    )
    return_status = Field(
        description="Return Status of the purchase",
        example="True",
        **_string
    )
    order_status = Field(
        description="Order Status of the purchase",
        example="Incoming",
        **_string
    )
    items = Field(
        description="Items object where this purchase"
    )
    created = Field(
        alias="created",
        description="When the user was registered (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on UsersRepository.create"""
    updated = Field(
        alias="updated",
        description="When the user was updated for the last time (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on UsersRepository.update (and initially on create)"""

