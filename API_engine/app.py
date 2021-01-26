"""APP
FastAPI app definition, initialization and definition of routes
"""

# # Installed # #
import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi import status as statuscode

# # Package # #
from .models import *
from .exceptions import *
from .repositories import UsersRepository, EnterpriseRepository, FileRepository
from .middlewares import request_handler
from .settings import api_settings as settings


__all__ = ("app", "run")


app = FastAPI(
    title=settings.title
)
app.middleware("http")(request_handler)


@app.get(
    "/users",
    response_model=UsersRead,
    description="List all the available users",
    tags=["users"]
)
def _list_users():
    # TODO Filters
    return UsersRepository.list()


@app.get(
    "/users/{user_id}",
    response_model=UserRead,
    description="Get a single user by its unique ID",
    responses=get_exception_responses(UserNotFoundException),
    tags=["users"]
)
def _get_user(user_id: str):
    return UsersRepository.get(user_id)


@app.post(
    "/users",
    description="Create a new user",
    response_model=UserRead,
    status_code=statuscode.HTTP_201_CREATED,
    responses=get_exception_responses(UserAlreadyExistsException),
    tags=["users"]
)
def _create_user(create: UserCreate):
    return UsersRepository.create(create)

@app.post(
    "/users/login",
    description="Login into system",
    responses=get_exception_responses(UserNotFoundException),
    tags=["users"]
)
def _login_user(email: str, password: str):
    return UsersRepository.login(email,password)

@app.patch(
    "/users/{user_id}",
    description="Update a single user by its unique ID, providing the fields to update",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(UserNotFoundException, UserAlreadyExistsException),
    tags=["users"]
)
def _update_user(user_id: str, update: UserUpdate):
    UsersRepository.update(user_id, update)


@app.delete(
    "/users/{user_id}",
    description="Delete a single user by its unique ID",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(UserNotFoundException),
    tags=["users"]
)
def _delete_user(user_id: str):
    UsersRepository.delete(user_id)

@app.get(
    "/enterprises",
    description="List all the available enterprises",
    tags=["enterprises"]
)
def _list_enterprises():
    # TODO Filters
    return EnterpriseRepository.list()


@app.get(
    "/enterprises/{enterprise_id}",
    response_model=EnterpriseRead,
    description="Get a single enterprise by its unique ID",
    responses=get_exception_responses(EnterpriseNotFoundException),
    tags=["enterprises"]
)
def _get_enterprise(enterprise_id: str):
    return EnterpriseRepository.get(enterprise_id)


@app.post(
    "/enterprises",
    description="Create a new enterprise",
    response_model=EnterpriseRead,
    status_code=statuscode.HTTP_201_CREATED,
    responses=get_exception_responses(EnterpriseAlreadyExistsException),
    tags=["enterprises"]
)
def _create_enterprise(create: EnterpriseCreate):
    return EnterpriseRepository.create(create)

@app.patch(
    "/enterprises/{enterprise_id}",
    description="Update a single enterprise by its unique ID, providing the fields to update",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(EnterpriseNotFoundException, EnterpriseAlreadyExistsException),
    tags=["enterprises"]
)
def _update_enterprise(enterprise_id: str, update: EnterpriseUpdate):
    EnterpriseRepository.update(enterprise_id, update)


@app.delete(
    "/enterprises/{enterprise_id}",
    description="Delete a single enterprise by its unique ID",
    status_code=statuscode.HTTP_204_NO_CONTENT,
    responses=get_exception_responses(EnterpriseNotFoundException),
    tags=["enterprises"]
)
def _delete_enterprise(enterprise_id: str):
    EnterpriseRepository.delete(enterprise_id)

@app.post(
    "/uploadfile/admin/",
    status_code=statuscode.HTTP_201_CREATED,
    tags=["files"]
    )
async def upload_file_admin(file: UploadFile = File(...)):
    FileRepository.adminUpload(file)
    return {
        "filename": file.filename,
        "status": True
        }

@app.post(
    "/uploadfile/manager/",
    status_code=statuscode.HTTP_201_CREATED,
    tags=["files"]
    )
async def upload_file_manager(purchaseOrder: UploadFile = File(...), quantity: UploadFile = File(...)):
    FileRepository.managerUpload(purchaseOrder, quantity)
    return [
        {
            "purchaseOrder" : purchaseOrder.filename,
            "status": True
        },
        {
            "quantity" : quantity.filename,
            "status": True
        }
    ]

def run():
    """Run the API using Uvicorn"""
    uvicorn.run(
        app,
        host=settings.host,
        port=settings.port,
        log_level=settings.log_level.lower()
    )