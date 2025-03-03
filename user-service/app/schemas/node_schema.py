from pydantic import BaseModel, EmailStr


class NodeCreaterequest(BaseModel):    
    node_id: str
    node_name: str
    contact_person: str
    phone: str
    email_id: EmailStr
    address: str
    city: str
    state: str
    country:str
    subscription:str