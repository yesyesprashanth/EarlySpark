from fastapi import Depends
from fastapi import APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.controllers.center_controller import CenterController
from app.schemas.center_schema import CenterCreateRequest
from app.schemas.response_schema import StandardResponse
router = APIRouter()


def get_center_controller(db:AsyncSession=Depends(get_db))->CenterController:
    return CenterController(db)


@router.post('/', response_model=StandardResponse)
async def create_center_route(center_data:CenterCreateRequest)->StandardResponse:
    return CenterController.create_center_controller(center_data)