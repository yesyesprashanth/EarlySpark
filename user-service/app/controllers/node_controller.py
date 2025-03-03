from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.node_schema import NodeCreaterequest
from app.services.node_service import NodeService
from app.schemas.response_schema import StandardResponse
from loguru import logger

class NodeController:
    def __init__(self, db:AsyncSession):
        self.node_service = NodeService(db)
        j=0

    async def create_node_controller(self, node_data:NodeCreaterequest)->StandardResponse:
        logger.info("Creating node")
        try:
            response = await self.node_service.create_node(node_data)
            logger.info("Node created successfully")
            response = StandardResponse(
                status="success",
                message="Node created successfully",
                data=response["data"]            
            )
            return response
        except Exception as e:
            raise HTTPException(status_code=500, detail="An error occurred while creating the node")
