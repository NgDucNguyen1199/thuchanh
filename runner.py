#!/usr/bin/env python3
import subprocess
import sys
import os

os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')
result = subprocess.run([sys.executable, 'extract_full.py'], capture_output=False, text=True)
sys.exit(result.returncode)
