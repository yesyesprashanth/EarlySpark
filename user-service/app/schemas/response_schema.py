from pydantic import BaseModel
from typing import Optional, Any


class StandardResponse(BaseModel):
    status: bool
    message: str
    data: Optional[Any] = None
