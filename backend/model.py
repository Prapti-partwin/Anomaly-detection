import joblib

model = joblib.load("backend/saved_model.pkl")

def predict_anomaly(data):
    prediction = model.predict([data])
    return int(prediction[0])