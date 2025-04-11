import sys
from deepface import DeepFace
import os

if len(sys.argv) < 3:
    print("No match")
    exit()

uploaded_image = sys.argv[1]
students_dir = sys.argv[2]

match_found = False

for file in os.listdir(students_dir):
    student_image = os.path.join(students_dir, file)
    try:
        result = DeepFace.verify(img1_path=uploaded_image, img2_path=student_image, enforce_detection=False)
        if result.get("verified", False):
            student_name = os.path.splitext(file)[0]
            print(student_name)
            match_found = True
            break
    except Exception as e:
        continue

if not match_found:
    print("No match")
