from pydantic import BaseModel
from typing import Optional
from app.enums import City, ReligiosityLevel, SexCategory

class PostCreate(BaseModel):
    post_type: str
    apartment_description: Optional[str] = None
    room_description: Optional[str] = None
    contact_info: Optional[str] = None
    num_roommates: Optional[int] = None
    religiosity_level: Optional[ReligiosityLevel] = None
    city: Optional[City] = None
    street_name: Optional[str] = None
    street_number: Optional[str] = None
    sex_category: Optional[SexCategory] = None

class PostSearchFilters(BaseModel):
    city: Optional[City] = None
    religiosity_level: Optional[ReligiosityLevel] = None
    num_roommates: Optional[int] = None
    post_type: Optional[str] = None
    sex_category: Optional[SexCategory] = None