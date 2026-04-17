#!/usr/bin/env python
"""Test 5 different PDF text extraction methods"""

import os
import sys
import subprocess

os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')

print("="*80)
print("PDF TEXT EXTRACTION METHOD TESTS")
print("="*80)
print()

# Method 1: pypdf
print("METHOD 1: pypdf (PdfReader)")
print("-" * 80)
try:
    from pypdf import PdfReader
    reader = PdfReader('bai-thuc-hanh-01.pdf')
    text = ''.join([page.extract_text() for page in reader.pages])
    print("✓ SUCCESS")
    print("First 500 chars:")
    print(text[:500])
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
print()

# Method 2: pdfplumber
print("METHOD 2: pdfplumber")
print("-" * 80)
try:
    import pdfplumber
    pdf = pdfplumber.open('bai-thuc-hanh-01.pdf')
    text = ''.join([page.extract_text() for page in pdf.pages])
    print("✓ SUCCESS")
    print("First 500 chars:")
    print(text[:500])
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
print()

# Method 3: pdftotext (command line)
print("METHOD 3: pdftotext command")
print("-" * 80)
try:
    result = subprocess.run(['pdftotext', 'bai-thuc-hanh-01.pdf', '-'], 
                          capture_output=True, text=True, timeout=10)
    if result.returncode == 0:
        text = result.stdout
        print("✓ SUCCESS")
        print("First 500 chars:")
        print(text[:500])
    else:
        print(f"✗ FAILED: Command returned code {result.returncode}")
        if result.stderr:
            print(f"Error: {result.stderr}")
except FileNotFoundError:
    print("✗ FAILED: pdftotext command not found")
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
print()

# Method 4: mutool draw
print("METHOD 4: mutool draw -F text")
print("-" * 80)
try:
    result = subprocess.run(['mutool', 'draw', '-F', 'text', 'bai-thuc-hanh-01.pdf'], 
                          capture_output=True, text=True, timeout=10)
    if result.returncode == 0:
        text = result.stdout
        print("✓ SUCCESS")
        print("First 500 chars:")
        print(text[:500])
    else:
        print(f"✗ FAILED: Command returned code {result.returncode}")
        if result.stderr:
            print(f"Error: {result.stderr}")
except FileNotFoundError:
    print("✗ FAILED: mutool command not found")
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
print()

# Method 5: tesseract
print("METHOD 5: tesseract (OCR)")
print("-" * 80)
try:
    result = subprocess.run(['tesseract', 'bai-thuc-hanh-01.pdf', 'stdout'], 
                          capture_output=True, text=True, timeout=10)
    if result.returncode == 0:
        text = result.stdout
        print("✓ SUCCESS")
        print("First 500 chars:")
        print(text[:500])
    else:
        print(f"✗ FAILED: Command returned code {result.returncode}")
        if result.stderr:
            print(f"Error: {result.stderr}")
except FileNotFoundError:
    print("✗ FAILED: tesseract command not found")
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
print()

print("="*80)
print("TEST COMPLETE")
print("="*80)
