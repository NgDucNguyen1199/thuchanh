import os
import sys

os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')

# Test Method 1: pypdf
try:
    from pypdf import PdfReader
    reader = PdfReader('bai-thuc-hanh-01.pdf')
    text = ''.join([page.extract_text() for page in reader.pages])
    print("METHOD 1 SUCCESS")
    print(text[:500])
except Exception as e:
    print(f"METHOD 1 FAILED: {e}")
