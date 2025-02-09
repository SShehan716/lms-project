from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import os

#  Dynamically Get Absolute Path for Model
model_path = os.path.abspath("./model/pass-fail-predict/saved_models/model_F-PD_4.h5")

#  Load the trained model
try:
    model = load_model(model_path)
except Exception as e:
    print(f"Error loading model: {str(e)}")

#  Initialize Flask app
app = Flask(__name__)

# Define Class Map (Same as Training)
class_map = {0: "Withdrawn", 1: "Fail", 2: "Pass", 3: "Distinction"}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        #  Get student data from request
        data = request.json.get('student_data')

        if not data:
            return jsonify({"error": "Missing 'student_data' in request"}), 400

        # Convert data to numpy array
        student_input = np.array(data)

        # Ensure input shape matches model expectations (truncate if necessary)
        expected_time_steps = 4  # Change this based on your model
        if student_input.shape[0] > expected_time_steps:
            student_input = student_input[:expected_time_steps]  # Trim to expected shape

        # Reshape for model prediction (add batch dimension)
        student_input = student_input.reshape(1, expected_time_steps, 10)  

        # Get model prediction
        prediction_probs = model.predict(student_input)
        predicted_class = np.argmax(prediction_probs, axis=1)[0]
        predicted_label = class_map.get(predicted_class, "Unknown")

        # Return JSON response
        return jsonify({"prediction": predicted_label})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)  