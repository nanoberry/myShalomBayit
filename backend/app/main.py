from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users, posts
from app.db import engine
from app.models import SQLModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


app.include_router(users.router)
app.include_router(posts.router)

