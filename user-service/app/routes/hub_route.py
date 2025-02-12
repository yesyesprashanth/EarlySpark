from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.response_schema import StandardResponse
from app.schemas.hub_schema import HubCreateRequest
from app.config.database import get_db
from app.controllers.hub_controller import HubController
router = APIRouter()


def get_hub_controller(db:AsyncSession=Depends(get_db)):
    if not db:
        raise Exception("Database connection not established")
    if not isinstance(db, AsyncSession):
        raise Exception("Invalid database connection")
    if not db.is_active:
        raise Exception("Database connection is not active")
    return HubController(db)


@router.get('/', response_model=StandardResponse)
def get_hello_world():
    response = StandardResponse(
        status="success",
        message="Hello World",
        data=None
    )
    return  response

@router.post('/', response_model=StandardResponse)
async def post_hello_world(hub_data:HubCreateRequest, HubController = Depends(get_hub_controller)):
    return await HubController.create_hub_controller(hub_data)
    
    



