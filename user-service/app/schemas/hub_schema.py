from pydantic import BaseModel

class HubCreateRequest(BaseModel):
    name: str
    age: int
    email: str
    address: str
    city: str