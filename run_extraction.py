import os
import sys

# Change to working directory
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
    print(repr(text[:500]))
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
    pdf.close()
    print("✓ SUCCESS")
    print("First 500 chars:")
    print(repr(text[:500]))
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
print()

# Method 3: pdftotext
print("METHOD 3: pdftotext")
print("-" * 80)
try:
    import subprocess
    result = subprocess.run(['pdftotext', 'bai-thuc-hanh-01.pdf', '-'], 
                          capture_output=True, text=True, timeout=10)
    if result.returncode == 0:
        text = result.stdout
        print("✓ SUCCESS")
        print("First 500 chars:")
        print(repr(text[:500]))
    else:
        print(f"✗ FAILED: Command returned code {result.returncode}")
        if result.stderr:
            print(f"stderr: {result.stderr}")
except FileNotFoundError:
    print("✗ FAILED: pdftotext not found")
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
print()

# Method 4: mutool
print("METHOD 4: mutool draw -F text")
print("-" * 80)
try:
    import subprocess
    result = subprocess.run(['mutool', 'draw', '-F', 'text', 'bai-thuc-hanh-01.pdf'], 
                          capture_output=True, text=True, timeout=10)
    if result.returncode == 0:
        text = result.stdout
        print("✓ SUCCESS")
        print("First 500 chars:")
        print(repr(text[:500]))
    else:
        print(f"✗ FAILED: Command returned code {result.returncode}")
        if result.stderr:
            print(f"stderr: {result.stderr}")
except FileNotFoundError:
    print("✗ FAILED: mutool not found")
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
print()

# Method 5: tesseract
print("METHOD 5: tesseract (OCR)")
print("-" * 80)
try:
    import subprocess
    result = subprocess.run(['tesseract', 'bai-thuc-hanh-01.pdf', 'stdout'], 
                          capture_output=True, text=True, timeout=10, stderr=subprocess.STDOUT)
    if result.returncode == 0 or result.stdout:
        text = result.stdout
        print("✓ SUCCESS")
        print("First 500 chars:")
        print(repr(text[:500]))
    else:
        print(f"✗ FAILED: Command returned code {result.returncode}")
        print(f"output: {result.stdout}")
except FileNotFoundError:
    print("✗ FAILED: tesseract not found")
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
print()

print("="*80)
print("TEST COMPLETE")
print("="*80)
