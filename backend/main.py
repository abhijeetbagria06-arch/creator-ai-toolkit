from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import anthropic
import os

# ── DATABASE SETUP ──────────────────────────────────────────
DATABASE_URL = "sqlite:///./creatorai.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ── MODELS ──────────────────────────────────────────────────
class User(Base):
    __tablename__ = "users"
    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String, nullable=True)
    email         = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    plan          = Column(String, default="free")
    credits       = Column(Integer, default=50)
    credits_reset = Column(DateTime, default=datetime.utcnow)
    created_at    = Column(DateTime, default=datetime.utcnow)

class UsageLog(Base):
    __tablename__ = "usage_logs"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer)
    tool       = Column(String)
    credits_used = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# ── AUTH SETUP ───────────────────────────────────────────────
SECRET_KEY = "creatorai-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login", auto_error=False)

PLAN_CREDITS = {"free": 50, "starter": 500, "pro": 2000}
TOOL_CREDITS = {
    "script": 5, "hook": 2, "idea": 3,
    "seo": 2, "hashtag": 1, "thumbnail": 2, "caption": 1
}

# ── ANTHROPIC CLIENT ─────────────────────────────────────────
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY", ""))
# ── FASTAPI APP ──────────────────────────────────────────────
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── HELPERS ──────────────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_token(data: dict):
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            return None
        return db.query(User).filter(User.email == email).first()
    except JWTError:
        return None

def reset_credits_if_needed(user: User, db: Session):
    now = datetime.utcnow()
    if (now - user.credits_reset).days >= 30:
        user.credits = PLAN_CREDITS.get(user.plan, 50)
        user.credits_reset = now
        db.commit()

def build_prompt(tool: str, inp: dict) -> str:
    if tool == "script":
        return f"Write a complete YouTube video script for a FACELESS channel.\nNiche: {inp.get('Niche','')}\nTopic: {inp.get('Topic','')}\nVideo Length: {inp.get('Video Length','')}\n\nInclude:\n🪝 HOOK (first 30 seconds)\n📖 INTRO\n🎯 MAIN CONTENT (3-5 key points)\n✅ OUTRO + CTA\n\nMake it conversational and optimized for retention."
    elif tool == "hook":
        return f"Write 5 viral hook variations for a faceless YouTube video.\nNiche: {inp.get('Niche','')}\nTopic: {inp.get('Topic','')}\n\nFor each hook make it impossible to ignore. Label them Hook 1-5."
    elif tool == "idea":
        return f"Generate a {inp.get('Days','30')}-day content calendar for a faceless YouTube channel.\nNiche: {inp.get('Niche','')}\n\nFor each day: Day number, Video title (SEO optimized), Core hook idea."
    elif tool == "seo":
        return f"Create a complete YouTube SEO package.\nTopic: {inp.get('Video Topic','')}\nTarget Audience: {inp.get('Target Audience','')}\n\nProvide: 5 title variations, full description, 20 tags, primary keyword + LSI keywords."
    elif tool == "hashtag":
        return f"Generate optimized hashtags.\nTopic: {inp.get('Topic','')}\nPlatform: {inp.get('Platform','')}\n\nProvide: 5 high-volume, 10 medium, 10 niche-specific hashtags with strategy."
    elif tool == "thumbnail":
        return f"Create Midjourney AND DALL-E prompts for a YouTube thumbnail.\nVideo Title: {inp.get('Video Title','')}\nStyle: {inp.get('Style','')}\n\nProvide: Midjourney prompt, DALL-E prompt, 3 text overlay suggestions, color scheme."
    elif tool == "caption":
        return f"Write 3 caption variations.\nTopic: {inp.get('Topic','')}\nPlatform: {inp.get('Platform','')}\nTone: {inp.get('Tone','')}\n\nEach caption: strong hook, main value, CTA, hashtags. Label A, B, C."
    return f"Help with {tool}: {inp}"

# ── SCHEMAS ──────────────────────────────────────────────────
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class GenerateRequest(BaseModel):
    tool: str
    inputs: dict
    token: str = None

# ── ROUTES ───────────────────────────────────────────────────
@app.get("/")
def home():
    return {"message": "AI Creator Toolkit Backend Running"}

@app.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        name=req.name,
        email=req.email,
        hashed_password=hash_password(req.password),
        plan="free",
        credits=50,
        credits_reset=datetime.utcnow()
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_token({"sub": user.email})
    return {
        "token": token,
        "user": {
            "name": user.name,
            "email": user.email,
            "plan": user.plan,
            "credits": user.credits
        }
    }

@app.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    reset_credits_if_needed(user, db)
    token = create_token({"sub": user.email})
    return {
        "token": token,
        "user": {
            "name": user.name,
            "email": user.email,
            "plan": user.plan,
            "credits": user.credits
        }
    }

@app.get("/me")
def get_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    reset_credits_if_needed(current_user, db)
    return {
        "name": current_user.name,
        "email": current_user.email,
        "plan": current_user.plan,
        "credits": current_user.credits
    }

@app.post("/generate")
def generate(req: GenerateRequest, db: Session = Depends(get_db)):
    # Get user from token if provided
    user = None
    if req.token:
        try:
            payload = jwt.decode(req.token, SECRET_KEY, algorithms=[ALGORITHM])
            email = payload.get("sub")
            if email:
                user = db.query(User).filter(User.email == email).first()
        except JWTError:
            pass

    # Check credits
    tool_cost = TOOL_CREDITS.get(req.tool, 1)
    if user:
        reset_credits_if_needed(user, db)
        if user.credits < tool_cost:
            raise HTTPException(status_code=402, detail="Not enough credits. Please upgrade your plan.")

    # Generate with Claude
    try:
        prompt = build_prompt(req.tool, req.inputs)
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1000,
            messages=[{"role": "user", "content": prompt}]
        )
        result = message.content[0].text

        # Deduct credits and log usage
        if user:
            user.credits -= tool_cost
            db.add(UsageLog(
                user_id=user.id,
                tool=req.tool,
                credits_used=tool_cost
            ))
            db.commit()

        return {
            "result": result,
            "credits_remaining": user.credits if user else None
        }
    except Exception as e:
        print(f"ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))