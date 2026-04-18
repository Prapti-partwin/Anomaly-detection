# IoT Anomaly Detection System

This project is a **full-stack IoT anomaly detection system** that uses **Machine Learning** to identify abnormal behavior in sensor data.

It analyzes **Temperature, Humidity, and Battery Level** and predicts whether the system is operating normally or showing anomalies.

---

## Key Highlights

* 🤖 AI-based anomaly detection using Machine Learning
* ⚡ FastAPI backend for real-time predictions
* 🌐 Interactive frontend dashboard
* 📊 Simulated live IoT sensor data
* 🚨 Instant anomaly alerts (Normal / Anomaly)

---

## 🗂️ Project Structure

```
IOT/
│
├── backend/
│   ├── main.py
│   ├── model.py
│   ├── train.py
│   ├── synthetic_iot_dataset.csv
│   └── saved_model.pkl
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── app.js
│   └── style.css
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```
git clone https://github.com/Prapti-partwin/Anomaly-detection.git
cd IOT
```

---

### 2️⃣ Install Backend Dependencies

```
pip install fastapi uvicorn pandas scikit-learn joblib
```

---

## 🧪 Train the Model

Run:

```
cd backend
python train.py
```

👉 This generates:

```
saved_model.pkl
```

---

## ▶️ Run Backend Server

From root folder:

```
uvicorn backend.main:app --reload
```

👉 API runs at:

```
http://127.0.0.1:8000
```

---

## 🌐 Run Frontend

Open:

```
frontend/index.html
```

in your browser.

---

## 📡 API Endpoints

### 🔹 GET /

Check API status

```
{
  "message": "IoT Anomaly Detection API Running"
}
```

---

### 🔹 POST /predict

**Request:**

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

## 🧠 Machine Learning Model

* Algorithm: **Random Forest Classifier**
* Type: Supervised Learning
* Features:

  * Temperature
  * Humidity
  * Battery Level
* Output:

  * 0 → Normal
  * 1 → Anomaly

👉 The model uses **multiple decision trees** and predicts based on **majority voting**.

---

## ⚙️ How It Works

1. Frontend generates or accepts sensor values
2. Data is sent to FastAPI backend
3. Model processes input
4. Prediction is returned
5. UI displays:

   * ✅ Normal
   * ⚠️ Anomaly

---

## Use Cases

* Smart home monitoring
* Industrial IoT systems
* Device health monitoring
* Predictive maintenance

---

## Future Improvements

* 📊 Real-time graphs (Chart.js)
* 📡 Live IoT device integration (ESP8266 / Arduino)
* ☁️ Cloud deployment (Render / AWS)
* 🔄 Auto model retraining

---

## 👨‍💻 Author

Developed as part of an **IoT + Machine Learning project**

---

##  Notes

* Ensure `saved_model.pkl` is generated before running backend
* Run backend before frontend
* Ignore `__pycache__` files

---

This project demonstrates integration of **AI + IoT + Web Technologies** for real-world anomaly detection.
