from sqlalchemy.ext.asyncio import AsyncSession
from app.services.hub_service import HubService
from app.schemas.hub_schema import HubCreateRequest
from app.schemas.response_schema import StandardResponse

class HubController:
    def __init__(self, db:AsyncSession):
        self.db = db
        self.hub_service = HubService(db)
    
    async def create_hub_controller(self, hub_data:HubCreateRequest):
        response = await self.hub_service.create_hub(hub_data)
        response = StandardResponse(
            status="succsss",
            message="Hub created successfully",
            data=response["data"]
        )

        return response

