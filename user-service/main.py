from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.routes.inital_route import router as initial_router
from app.config.database import create_tables, close_connection
from loguru import logger

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    # initial db
    await create_tables()    
    yield
    # Clean up the ML models and release the resources
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

app.include_router(initial_router, tags=["user"])




