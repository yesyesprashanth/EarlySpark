from app.schemas.hub_schema import HubCreateRequest
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.hub import Hub
class HubService:

    def __init__(self, db:AsyncSession):
        self.db = db

    async def create_hub(self, hub_data:HubCreateRequest):
        print(hub_data)                
        data:Hub = Hub(**hub_data.model_dump())                        

        print(data)

        self.db.add(data)
        await self.db.commit()        
        await self.db.refresh(data)
        return {"data":data.id}
        