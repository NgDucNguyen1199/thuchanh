#!/usr/bin/env python3
import os
import sys
import subprocess

os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')
pdf_file = 'bai-thuc-hanh-01.pdf'

print("=" * 60)
print("PDF TEXT EXTRACTION - TESTING 5 METHODS")
print("=" * 60)

# Method 1: pypdf
print("\n[Method 1] pypdf")
print("-" * 60)
try:
    from pypdf import PdfReader
    reader = PdfReader(pdf_file)
    text = ''.join([page.extract_text() for page in reader.pages])
    print("✓ SUCCESS")
    print(f"Extracted {len(text)} characters")
    print("First 500 characters:")
    print(text[:500])
except Exception as e:
    print(f"✗ FAILED: {e}")

# Method 2: pdfplumber
print("\n[Method 2] pdfplumber")
print("-" * 60)
try:
    import pdfplumber
    with pdfplumber.open(pdf_file) as pdf:
        text = ''.join([page.extract_text() for page in pdf.pages])
    print("✓ SUCCESS")
    print(f"Extracted {len(text)} characters")
    print("First 500 characters:")
    print(text[:500])
except Exception as e:
    print(f"✗ FAILED: {e}")

# Method 3: pdftotext
print("\n[Method 3] pdftotext")
print("-" * 60)
try:
    result = subprocess.run(['pdftotext', pdf_file, '-'], capture_output=True, text=True, timeout=10)
    if result.returncode == 0:
        text = result.stdout
        print("✓ SUCCESS")
        print(f"Extracted {len(text)} characters")
        print("First 500 characters:")
        print(text[:500])
    else:
        print(f"✗ FAILED: {result.stderr}")
except FileNotFoundError:
    print("✗ FAILED: pdftotext command not found")
except Exception as e:
    print(f"✗ FAILED: {e}")

# Method 4: mutool
print("\n[Method 4] mutool")
print("-" * 60)
try:
    result = subprocess.run(['mutool', 'draw', '-F', 'text', pdf_file], capture_output=True, text=True, timeout=10)
    if result.returncode == 0:
        text = result.stdout
        print("✓ SUCCESS")
        print(f"Extracted {len(text)} characters")
        print("First 500 characters:")
        print(text[:500])
    else:
        print(f"✗ FAILED: {result.stderr}")
except FileNotFoundError:
    print("✗ FAILED: mutool command not found")
except Exception as e:
    print(f"✗ FAILED: {e}")

# Method 5: tesseract (OCR)
print("\n[Method 5] tesseract (OCR)")
print("-" * 60)
try:
    result = subprocess.run(['tesseract', pdf_file, 'stdout'], capture_output=True, text=True, timeout=30)
    if result.returncode == 0:
        text = result.stdout
        print("✓ SUCCESS")
        print(f"Extracted {len(text)} characters")
        print("First 500 characters:")
        print(text[:500])
    else:
        print(f"✗ FAILED: {result.stderr}")
except FileNotFoundError:
    print("✗ FAILED: tesseract command not found")
except Exception as e:
    print(f"✗ FAILED: {e}")

print("\n" + "=" * 60)
print("TESTING COMPLETE")
print("=" * 60)
