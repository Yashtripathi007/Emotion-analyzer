from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI();

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["POST","GET"],
    allow_headers=["*"],
)

class frontendRequest(BaseModel):
    text:str

class frontendResponce(BaseModel): 
    emotion:str
    confidence:float 

@app.post("/analyse",response_model=frontendResponce)
def any_emotion(payload:frontendRequest):
    text=payload.text.lower()

    if any(word in text for word in ["happy","awesome","nice",  "good", "very good"]):
        emotion = "Happy"
        confidence = 0.8
    elif any(word in text for word in ["depression","sad","sadness","anxiety"]):
        emotion = "Sad"
        confidence = 0.3    
    elif any(word in text for word in ["angry","mad","less","bad",  "lonely"]):
        emotion = "Anger"
        confidence = 0.4
    elif any(word in text for word in ["gf", "left", "nobody","nolove"]):
        emotion = "Emotional"
        confidence = 0.6
    else:
        emotion = "Nutral" 
        confidence = 0.7 




    return {"emotion":emotion,"confidence":confidence}  
