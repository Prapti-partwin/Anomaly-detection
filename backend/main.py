from fastapi import FastAPI
from pydantic import BaseModel
from backend.model import predict_anomaly
from fastapi.middleware.cors import CORSMiddleware  # ADD THIS for integration with frontend

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or replace * with "http://127.0.0.1:5500" for safety
    allow_methods=["*"],
    allow_headers=["*"],
)

class SensorData(BaseModel):
    temperature: float
    humidity: float
    battery: float

@app.get("/")
def home():
    return {"message": "IoT Anomaly Detection API Running"}

@app.post("/predict")
def detect(data: SensorData):
    result = predict_anomaly([
        data.temperature,
        data.humidity,
        data.battery
    ])

    return {
        "anomaly": result,
        "status": "⚠️ Anomaly Detected" if result == 1 else "✅ Normal"
    }