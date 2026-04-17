# Anomaly-detection
IOT based - dataset and detecting anomaly
This project is a **FastAPI-based backend system** for detecting anomalies in IoT sensor data using Machine Learning.

It analyzes sensor parameters like **Temperature, Humidity, and Battery Level** and predicts whether the device behavior is normal or abnormal.

---

## 🧠 Features

* 🔍 Anomaly detection using Machine Learning (Random Forest)
* ⚡ FastAPI-based REST API
* 📊 Handles real-time sensor input
* 🚨 Returns alert for abnormal conditions
* 💾 Pre-trained model using dataset

---

## 🗂️ Project Structure

```
backend/
│
├── main.py                  # FastAPI app
├── model.py                 # Model loading & prediction logic
├── train.py                 # Model training script
├── synthetic_iot_dataset.csv
├── saved_model.pkl          # Trained model file
```

---

## ⚙️ Installation

1. Clone the repository

```
git clone <your-repo-link>
cd IOT/backend
```

2. Install dependencies

```
pip install fastapi uvicorn pandas scikit-learn joblib
```

---

## 🧪 Train the Model

Before running the API, train the model:

```
python train.py
```

This will generate:

```
saved_model.pkl
```

---

## ▶️ Run the Server

From the root project folder:

```
uvicorn backend.main:app --reload
```

Server will start at:

```
http://127.0.0.1:8000
```

---

## 📡 API Endpoints

### 🔹 GET /

Check if API is running

**Response:**

```
{
  "message": "IoT Anomaly Detection API Running"
}
```

---

### 🔹 POST /predict

Detect anomaly from sensor data

**Request Body:**

```
{
  "temperature": 25,
  "humidity": 60,
  "battery": 80
}
```

**Response:**

```
{
  "anomaly": 0,
  "status": "✅ Normal"
}
```

or

```
{
  "anomaly": 1,
  "status": "⚠️ Anomaly Detected"
}
```

---

## 🧠 Model Details

* Algorithm: Random Forest Classifier
* Input Features:

  * Temperature
  * Humidity
  * Battery Level
* Output:

  * 0 → Normal
  * 1 → Anomaly

---

## 🚀 Future Improvements

* 🌐 Frontend dashboard (React / HTML)
* 📊 Real-time visualization (charts)
* 📡 IoT device integration (ESP8266 / Arduino)
* ☁️ Cloud deployment (Render / AWS)

---

## 👨‍💻 Author

* Developed as part of IoT + Machine Learning project

---

## 📌 Notes

* Make sure `saved_model.pkl` is generated before running the API
* Run the server from the correct directory to avoid import issues

---

⭐ If you like this project, consider adding enhancements like real-time monitoring and alerts!

