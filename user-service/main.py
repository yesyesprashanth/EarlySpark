from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.routes.inital_route import router as initial_router
from app.config.database import create_tables, close_connection
from app.routes.hub_route import router as hub_router
from loguru import logger

@asynccontextmanager
async def lifespan(app: FastAPI):    
    # initial db
    await create_tables()    
    yield    
    # close db
    await close_connection()    

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(initial_router, tags=["User"])
app.include_router(hub_router, prefix='/api/v1', tags=["Hubs"])



