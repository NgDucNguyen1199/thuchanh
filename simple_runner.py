#!/usr/bin/env python3
import subprocess
import sys
import os

os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')

# Run extract_full.py
result = subprocess.call([sys.executable, 'extract_full.py'])
sys.exit(result)
