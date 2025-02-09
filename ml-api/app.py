# from flask import Flask, request, jsonify
# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# import os

# #  Dynamically Get Absolute Path for Model
# model_path = os.path.abspath("./model/pass-fail-predict/saved_models/model_F-PD_4.h5")

# #  Load the trained model
# try:
#     model = load_model(model_path)
# except Exception as e:
#     print(f"Error loading model: {str(e)}")

# #  Initialize Flask app
# app = Flask(__name__)

# # Define Class Map (Same as Training)
# class_map = {0: "Withdrawn", 1: "Fail", 2: "Pass", 3: "Distinction"}

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         #  Get student data from request
#         data = request.json.get('student_data')

#         if not data:
#             return jsonify({"error": "Missing 'student_data' in request"}), 400

#         # Convert data to numpy array
#         student_input = np.array(data)

#         # Ensure input shape matches model expectations (truncate if necessary)
#         expected_time_steps = 4  # Change this based on your model
#         if student_input.shape[0] > expected_time_steps:
#             student_input = student_input[:expected_time_steps]  # Trim to expected shape

#         # Reshape for model prediction (add batch dimension)
#         student_input = student_input.reshape(1, expected_time_steps, 10)  

#         # Get model prediction
#         prediction_probs = model.predict(student_input)
#         predicted_class = np.argmax(prediction_probs, axis=1)[0]
#         predicted_label = class_map.get(predicted_class, "Unknown")

#         # Return JSON response
#         return jsonify({"prediction": predicted_label})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=False)  



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