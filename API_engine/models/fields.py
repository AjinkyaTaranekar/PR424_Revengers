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

__all__ = ("UserFields", "AddressFields", "EnterpriseFields", "PurchaseOrderFields", "ItemsFields", "SummaryFields", "PurchaseOrderStatusFields", "PurchaseOrderItemFields")

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
    billing = Field(
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
class AsinFields:
    _id = Field(
        description="Unique identifier of this asin in the database",
        example=get_uuid(),
        min_length=36,
        max_length=36
    )
    """The purchase_id is the _id field of Mongo documents, and is set on PurchaseRepository.create"""
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
    bundle_items = Field(
        description="Sub item present in Items, if Bundled",
    )
    our_cost = Field(
        description="Cost of the product",
        example="1200.0",
        **_string
    )
    created = Field(
        alias="created",
        description="When the asin was added (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on AsinInfoRepository.create"""
    updated = Field(
        alias="updated",
        description="When the asin was updated for the last time (Unix timestamp)",
        **_unix_ts
    )
    """Created is set on AsinInfoRepository.update (and initially on create)"""
    
class ItemsFields:
    asin_id = Field(
        description="ASIN Id of the Item",
        example=get_uuid(),
        min_length=36,
        max_length=36
    )
    shipped = Field(
        description="Shipping Status of the item",
        example=False
    )
    stock = Field(
        description="Stock Status of the item",
        example=False
    )
    unit_cost = Field(
        description="Unit Cost of the item on Amazon",
        example="1000.0",
        **_string
    )
    quantity = Field(
        description="Quantity of the item requested",
        example="45",
        **_string
    )
    details = Field(
        description="Details of the item requested"
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
    completed_status = Field(
        description="Completed Status of the purchase",
        example=True
    )
    items = Field(
        description="Items object where this purchase"
    )
    box = Field(
        description="Summary URLs of the purchase",
    )
    total_amt = Field(
        description="Total Amount of the purchase",
        example=450
    )
    invoice  = Field(
        description="Invoice URLs of the purchase"
    )
    appt_date  = Field(
        description="Appointment Date of the purchase",
        example="2021-02-14",
        **_string
    )
    appt_notes = Field(
        description="Appointment Notes of the purchase",
        example="Incoming",
        **_string
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

class PurchaseOrderStatusFields:
    purchase_order = Field(
        description="Purchase Order of the purchase",
        example="XXXXXXXXX",
    )
    status = Field(
        description="Stock/Shipped Status of the purchase",
        example="stock",
        **_string
    )
    asins = Field(
        description="ASINs List in this purchase"
    )

class PurchaseOrderItemFields:
    purchase_order = Field(
        description="Purchase Order of the purchase",
        example="XXXXXXXXX",
    )
    update = Field(
        description="Update List in this purchase in form of asin and unit cost"
    )

class SummaryFields:
    po = Field(
        description="Purchase Order of the Summary",
        example="PO3251324",
        **_string
    )
    destination = Field(
        description="Shipping Location",
        example="Indore",
        **_string
    )
    items = Field(
        description="Item List",
    )

class InvoiceFields:
    purchase_order = Field(
        description="Purchase Order of the Invoice",
        example="PO3251324",
        **_string
    )
    billed_to_id = Field(
        description="Unique identifier of the entereprise in the database, which has purchased",
        example=get_uuid(),
        min_length=36,
        max_length=36
    )
    billed_from_id = Field(
        description="Unique identifier of the entereprise in the database, from purchase is made",
        example=get_uuid(),
        min_length=36,
        max_length=36
    )
