import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("synthetic_iot_dataset.csv")

X = df[['Temperature', 'Humidity', 'Battery_Level']]
y = df['Anomaly']

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "saved_model.pkl")

print("Model trained and saved!")