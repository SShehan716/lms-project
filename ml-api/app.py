from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import pickle
import pandas as pd
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
import os

app = Flask(__name__)

# Load Trained Model
model_path = os.path.abspath("./model/pass-fail-predict/saved_models/model_WF-PD_5.h5")
model = load_model(model_path)

# Load Encoders & Scalers Used in Training
with open("./encoders-scalers/label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)  # Dictionary of label encoders

with open("./encoders-scalers/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)  # MinMaxScaler

# Define Expected Feature Columns (Same as Training)
feature_cols = [
    "weekly_avg_click_volume", "avg_score_segment", "num_assessments_segment", "sum_click",
    "gender", "region", "highest_education", "imd_band", "age_band", "disability"
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get Raw Input Data (Expecting List of 5 Time Steps)
        input_data = request.get_json()

        # Ensure 'data' key is in the request
        if "data" not in input_data:
            return jsonify({"error": "Missing 'data' key in request"}), 400

        # Convert JSON to DataFrame
        df = pd.DataFrame(input_data["data"])  # Extract list from "data" key

        # Debugging: Print available columns
        print("[DEBUG] Received Columns:", df.columns.tolist())

        # Ensure all required columns are present
        required_cols = [
            "weekly_avg_click_volume", "avg_score_segment", "num_assessments_segment", "sum_click",
            "gender", "region", "highest_education", "imd_band", "age_band", "disability"
        ]
        missing_cols = [col for col in required_cols if col not in df.columns]

        if missing_cols:
            return jsonify({"error": f"Missing columns in input: {missing_cols}"}), 400

        # Encode Categorical Columns
        for col in ["gender", "region", "highest_education", "imd_band", "age_band", "disability"]:
            df[col] = label_encoders[col].transform(df[col])  # Encode using stored mappings

        # Scale Numerical Features
        df[["weekly_avg_click_volume", "avg_score_segment", "num_assessments_segment", "sum_click"]] = \
            scaler.transform(df[["weekly_avg_click_volume", "avg_score_segment", "num_assessments_segment", "sum_click"]])

        # Ensure Input Shape is (1, 5, 10)
        X_input = np.reshape(df.values, (1, 5, 10))  

        # Predict
        # Predict (Binary Output)
        pred_prob = model.predict(X_input)[0][0]  # Get probability from sigmoid output

        # Convert Probability to Class (Threshold: 0.5)
        predicted_label = "Pass" if pred_prob > 0.5 else "Fail"

        return jsonify({
            "prediction": predicted_label,
            "confidence": float(pred_prob)  # Return confidence score
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)