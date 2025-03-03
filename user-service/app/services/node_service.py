from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession 
from app.models.node import Node
from app.schemas.node_schema import NodeCreaterequest
from loguru import logger

class NodeService:
    def __init__(self, db:AsyncSession):
        self.db = db

    async def create_node(self, node_data:NodeCreaterequest):
        try:
            logger.info(f"Creating node service {node_data.model_dump()}")
            node = Node(**node_data.model_dump())
            logger.info(1)
            self.db.add(node)
            logger.info(2)
            await self.db.commit()
            logger.info(3)
            await self.db.refresh(node)
            logger.info(4)        
            return {"data": node.id}
        except Exception as err:
            logger.error(f"Error creating node: {err}")
            raise HTTPException(status_code=500, detail="An error occurred while creating the node")