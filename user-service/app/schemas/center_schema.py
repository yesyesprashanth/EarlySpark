from pydantic import BaseModel, EmailStr

class Center(BaseModel):    
    center_name:str
    contact_name:str
    registration_id:str
    phone:str
    email_id:EmailStr
    address:str
    state:str
    city:str
    country:str
    hub_id: int