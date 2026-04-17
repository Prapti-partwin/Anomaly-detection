from fastapi import FastAPI
from pydantic import BaseModel
from backend.model import predict_anomaly

app = FastAPI()

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