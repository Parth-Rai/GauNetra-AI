import sys
import json
import os
import tensorflow as tf
import numpy as np
from PIL import Image


script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'resnet_last150_model_fp16.tflite')


BREEDS = [
    "Alambadi", "Amritmahal", "Ayrshire", "Banni", "Bargur", "Bhadawari", 
    "Brown Swiss", "Dangi", "Deoni", "Gir", "Guernsey", "Hallikar", 
    "Hariana", "Holstein Friesian", "Jaffrabadi", "Jersey", "Kangayam", 
    "Kankrej", "Kasargod", "Kenkatha", "Kherigarh", "Khillari", 
    "Krishna Valley", "Malnad Gidda", "Mehsana", "Murrah", "Nagori", 
    "Nagpuri", "Nili-Ravi", "Nimari", "Ongole", "Pulikulam", "Rathi", 
    "Red Dane", "Red Sindhi", "Sahiwal", "Surti", "Tharparkar", "Toda", 
    "Umblachery", "Vechur"
]
    
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()



def predict_breed(image_path):
    try:
       
        _, height, width, _ = input_details[0]['shape']
        image = Image.open(image_path).convert('RGB').resize((height, width))
        img_array = np.expand_dims(np.array(image), axis=0).astype(np.float32)

       
        img_array = img_array / 255.0

       
        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()
        predictions = interpreter.get_tensor(output_details[0]['index'])
        
        
        predicted_class_index = int(np.argmax(predictions))
        confidence = float(np.max(predictions))
        breed = BREEDS[predicted_class_index] if predicted_class_index < len(BREEDS) else "Unknown"

        return json.dumps({"breed": breed, "confidence": confidence})

    except Exception as e:
        return json.dumps({"error": str(e)})

    except Exception as e:
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    image_file_path = sys.argv[1]
    result = predict_breed(image_file_path)
    print(result)