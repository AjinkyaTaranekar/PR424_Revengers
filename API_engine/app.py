"""APP
FastAPI app definition, initialization and definition of routes
"""

# # Native # #
from typing import Optional, List

# # Installed # #
import uvicorn
from fastapi import FastAPI, File, UploadFile, Query
from fastapi import status as statuscode
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

# # Package # #
from .models import *
from .exceptions import *
from .repositories import UsersRepository, EnterpriseRepository, FileRepository, PurchaseOrderRepository, InvoiceRepository, SummaryRepository, PickListRepository
from .middlewares import request_handler
from .settings import api_settings as settings


__all__ = ("app", "run")


app = FastAPI(
    title=settings.title
)

app.middleware("http")(request_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get(
    "/users",
    response_model=UsersRead,
    description="List all the available users",
    tags=["Users"]
)
def _list_users():
    # TODO Filters
    return UsersRepository.list()


@app.get(
    "/users/{user_id}",
    response_model=UserRead,
    description="Get a single user by its unique ID",
    responses=get_exception_responses(UserNotFoundException),
    tags=["Users"]
)
def _get_user(user_id: str):
    return UsersRepository.get(user_id)


@app.post(
    "/users",
    description="Create a new user",
    response_model=UserRead,
    status_code=statuscode.HTTP_201_CREATED,
    responses=get_exception_responses(UserAlreadyExistsException),
    tags=["Users"]
)
def _create_user(create: UserCreate):
    return UsersRepository.create(create)

@app.post(
    "/users/login",
    description="Login into system",
    responses=get_exception_responses(UserNotFoundException),
    tags=["Users"]
)
def _login_user(email: str, password: str):
    return UsersRepository.login(email,password)

@app.patch(
    "/users/{user_id}",
    description="Update a single user by its unique ID, providing the fields to update",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(UserNotFoundException, UserAlreadyExistsException),
    tags=["Users"]
)
def _update_user(user_id: str, update: UserUpdate):
    UsersRepository.update(user_id, update)


@app.delete(
    "/users/{user_id}",
    description="Delete a single user by its unique ID",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(UserNotFoundException),
    tags=["Users"]
)
def _delete_user(user_id: str):
    UsersRepository.delete(user_id)

@app.get(
    "/enterprises",
    description="List all the available enterprises",
    tags=["Enterprises"]
)
def _list_enterprises():
    # TODO Filters
    return EnterpriseRepository.list()


@app.get(
    "/enterprises/{enterprise_id}",
    response_model=EnterpriseRead,
    description="Get a single enterprise by its unique ID",
    responses=get_exception_responses(EnterpriseNotFoundException),
    tags=["Enterprises"]
)
def _get_enterprise(enterprise_id: str):
    return EnterpriseRepository.get(enterprise_id)


@app.post(
    "/enterprises",
    description="Create a new enterprise",
    response_model=EnterpriseRead,
    status_code=statuscode.HTTP_201_CREATED,
    responses=get_exception_responses(EnterpriseAlreadyExistsException),
    tags=["Enterprises"]
)
def _create_enterprise(create: EnterpriseCreate):
    return EnterpriseRepository.create(create)

@app.patch(
    "/enterprises/{enterprise_id}",
    description="Update a single enterprise by its unique ID, providing the fields to update",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(EnterpriseNotFoundException, EnterpriseAlreadyExistsException),
    tags=["Enterprises"]
)
def _update_enterprise(enterprise_id: str, update: EnterpriseUpdate):
    EnterpriseRepository.update(enterprise_id, update)


@app.delete(
    "/enterprises/{enterprise_id}",
    description="Delete a single enterprise by its unique ID",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(EnterpriseNotFoundException),
    tags=["Enterprises"]
)
def _delete_enterprise(enterprise_id: str):
    EnterpriseRepository.delete(enterprise_id)

@app.post(
    "/uploadfile/admin/",
    status_code=statuscode.HTTP_201_CREATED,
    tags=["Files"]
    )
async def upload_file_admin(export_channel: UploadFile = File(...),export_item: UploadFile = File(...),pricing: UploadFile = File(...)):
    FileRepository.adminUpload(export_channel,export_item,pricing)
    return [
        {
            "export_channel" : export_channel.filename,
            "status": True
        },
        {
            "export_item" : export_item.filename,
            "status": True
        },
        {
            "pricing" : pricing.filename,
            "status": True
        }
    ]
@app.post(
    "/uploadfile/manager/",
    status_code=statuscode.HTTP_201_CREATED,
    tags=["Files"]
    )
async def upload_file_manager(purchaseOrder: UploadFile = File(...), quantity: Optional[UploadFile] = File(None)):
    FileRepository.managerUpload(purchaseOrder, quantity)
    return [
        {
            "purchaseOrder" : purchaseOrder.filename,
            "status": True
        },
        {
            "quantity" : quantity.filename if quantity else "NA",
            "status": True if quantity else False
        }
    ]

@app.get(
    "/purchase_orders",
    description="List all the available purchase orders",
    tags=["Purchase Order"]
)
def _list_purchase_order():
    # TODO Filters
    return PurchaseOrderRepository.list()


@app.get(
    "/purchase_orders/{purchase_order}",
    response_model=PurchaseOrderRead,
    description="Get a single purchase details by its purchase order",
    responses=get_exception_responses(PurchaseOrderNotFoundException),
    tags=["Purchase Order"]
)
def _get_purchase_order(purchase_order: str):
    return PurchaseOrderRepository.get(purchase_order)

@app.patch(
    "/purchase_orders/{purchase_order}",
    description="Update a single purchase order by its unique ID, providing the fields to update",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(PurchaseOrderNotFoundException, PurchaseOrderAlreadyExistsException),
    tags=["Purchase Order"]
)
def _update_purchase_order(purchase_order: str, update: PurchaseOrderUpdate):
    PurchaseOrderRepository.update(purchase_order, update)

@app.patch(
    "/purchase_orders/update_status/{purchase_order}",
    description="Update an item status by its unique ID",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(PurchaseOrderNotFoundException),
    tags=["Purchase Order"]
)
def  _update_purchase_order_item_status(purchase_order: str, status : str, asins: List[str] = Query(None)):
    PurchaseOrderRepository.updateItemStatus(purchase_order, asins, status)
    
@app.post(
    "/invoice",
    description="Create an Invoice",
    status_code=statuscode.HTTP_201_CREATED,
    responses=get_exception_responses(PurchaseOrderNotFoundException,EnterpriseNotFoundException),
    tags=["Invoice"]
)
def _get_invoice(billed_from_id: str, billed_to_id: str, purchase_order: str):
    filePaths = InvoiceRepository.getInvoice(purchase_order,billed_from_id,billed_to_id)
    return [FileResponse(filePath) for filePath in filePaths]

@app.post(
    "/summary",
    description="Create a Summary",
    status_code=statuscode.HTTP_201_CREATED,
    tags=["Summary"]
)
def _get_summary(SummaryData: Summary):
    filePath = SummaryRepository.getSummary(SummaryData)
    return [FileResponse(filePath)] 

@app.post(
    "/picklist",
    description="Create a PickList",
    status_code=statuscode.HTTP_201_CREATED,
    tags=["PickList"]
)
def _get_picklist(purchase_order: str):
    filePath = PickListRepository.getPickList(purchase_order)
    return [FileResponse(filePath)] 

def run():
    """Run the API using Uvicorn"""
    uvicorn.run(
        app,
        host=settings.host,
        port=settings.port,
        log_level=settings.log_level.lower()
    )
