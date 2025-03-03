from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.center_service import CenterService
from app.schemas.center_schema import CenterCreateRequest
from app.schemas.response_schema import StandardResponse
from loguru import logger

class CenterController:
    def __init__(self, db:AsyncSession):       
        self.center_service = CenterService(db)

    async def create_center_controller(self, center_data:CenterCreateRequest):
        try:
            response = await self.center_service.create_center(center_data)

            response = StandardResponse(
                status="success",
                message="Center created successfully",
                data=response["data"]        
            )

            return response
        except Exception as e:
            logger.info("Center service/controller errorError")
            error_response = StandardResponse(
                status="error",
                message="An error occurred while creating the center",
                data=None            
            )
            raise HTTPException(status_code=500, detail=error_response.model_dump())

