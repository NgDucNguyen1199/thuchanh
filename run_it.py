import subprocess
import sys

result = subprocess.run([sys.executable, r'C:\Users\pho21\Downloads\CCNMTPTPM\extract_all_methods.py'], 
                       capture_output=False, text=True)
sys.exit(result.returncode)
