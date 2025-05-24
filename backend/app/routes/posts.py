from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db import get_session
from app.models import Post
from app.schemas import PostCreate
from typing import Optional, List
from app.enums import ReligiosityLevel, City

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.post("/")
def create_post(post: PostCreate, session: Session = Depends(get_session)):
    new_post = Post(**post.dict(), user_id=1)  # TODO: replace with auth'd user ID
    session.add(new_post)
    session.commit()
    session.refresh(new_post)
    return new_post

@router.get("/", response_model=List[Post])
def search_posts(
    session: Session = Depends(get_session),
    city: Optional[City] = None,
    religiosity_level: Optional[ReligiosityLevel] = None,
    min_roommates: Optional[int] = None,
    max_roommates: Optional[int] = None,
    post_type: Optional[str] = None,
):
    query = select(Post)

    if city:
        query = query.where(Post.city == city)

    if religiosity_level:
        query = query.where(Post.religiosity_level == religiosity_level)

    if min_roommates is not None:
        query = query.where(Post.num_roommates >= min_roommates)

    if max_roommates is not None:
        query = query.where(Post.num_roommates <= max_roommates)

    if post_type:
        query = query.where(Post.post_type == post_type)

    results = session.exec(query).all()
    return results
