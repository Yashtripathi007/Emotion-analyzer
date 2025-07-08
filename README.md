# Emotion-analyzer

# for frontend 
cd frontend
npm install
npm run dev

# for backend use 
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn pydantic
uvicorn main:app --reload