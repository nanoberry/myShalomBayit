from sqlmodel import SQLModel, Field
from typing import Optional
from app.enums import ReligiosityLevel, City, SexCategory

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, nullable=False)
    hashed_password: str
    full_name: str
    preferences: Optional[str] = None



class Post(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    post_type: str  # "has_apartment", "searching_apartment", "forming_group"
    
    # Only used for "has_apartment" type
    apartment_description: Optional[str] = None
    room_description: Optional[str] = None
    contact_info: Optional[str] = None

    # Filters (shared)
    num_roommates: Optional[int] = None
    religiosity_level: Optional[ReligiosityLevel] = None

    city: Optional[City] = None
    street_name: Optional[str] = None
    street_number: Optional[str] = None

    sex_category: Optional[SexCategory] = None