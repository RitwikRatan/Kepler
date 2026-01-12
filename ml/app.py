
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load artifacts
try:
    model = joblib.load('habitability_model.pkl')
    scaler = joblib.load('scaler.pkl')
    le_type = joblib.load('le_type.pkl')
    le_atmos = joblib.load('le_atmos.pkl')
except:
    print("Model not found. Please run train.py first.")

class PlanetData(BaseModel):
    Type: str
    Mass_Earth: float
    Radius_Earth: float
    Orbital_Period_Days: float
    Distance_AU: float
    Surface_Temp_K: float
    Gravity_g: float
    Atmosphere_Type: str

@app.post("/predict")
def predict_habitability(data: PlanetData):
    # Prepare input dataframe
    input_data = pd.DataFrame([data.dict()])
    
    # Encode categorical
    # Handle new categories gracefully if possible, or use 'Unknown' if not found?
    # For now assume mostly standard or valid inputs
    
    # Find closest known type or default
    try:
        input_data['Type'] = le_type.transform(input_data['Type'])
    except:
        input_data['Type'] = le_type.transform(['Unknown'])[0] if 'Unknown' in le_type.classes_ else 0
        
    try:
        input_data['Atmosphere_Type'] = le_atmos.transform(input_data['Atmosphere_Type'])
    except:
         input_data['Atmosphere_Type'] = le_atmos.transform(['Unknown'])[0] if 'Unknown' in le_atmos.classes_ else 0

    # Scale
    input_scaled = scaler.transform(input_data)
    
    # Predict
    class_pred = model.predict(input_scaled)[0]
    # prob_pred = model.predict_proba(input_scaled) 
    
    return {
        "habitability": class_pred,
        # "probability": prob_pred.tolist()
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
