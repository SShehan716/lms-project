import h5py

model_path = "./model/pass-fail-predict/saved_models/model_1.h5"  # Update with the correct path

try:
    with h5py.File(model_path, 'r') as f:
        print("✅ Valid HDF5 model file:", list(f.keys()))
except Exception as e:
    print("Error: The model file is not valid or is corrupted.")
    print("Error details:", str(e))