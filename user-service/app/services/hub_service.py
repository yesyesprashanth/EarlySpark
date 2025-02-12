from app.schemas.hub_schema import HubCreateRequest
class HubService:
    def __init__(self, db):
        self.db = db

    def create_hub(self, hub_data:HubCreateRequest):
        print(hub_data)
        data = {**hub_data.model_dump()}
        return {"data":data}
        