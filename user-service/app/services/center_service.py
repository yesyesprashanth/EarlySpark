from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.center_schema import CenterCreateRequest

class CenterService():
    def __init__(self, db:AsyncSession):
        self.db = db

    async def create_center(center_data:CenterCreateRequest):
        pass
