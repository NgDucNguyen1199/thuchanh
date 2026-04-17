#!/usr/bin/env python3
"""Extract text from PDF using multiple methods - saves full text for analysis"""
import os
import sys
import subprocess

os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')
pdf_file = 'bai-thuc-hanh-01.pdf'

print("="*80)
print("PDF TEXT EXTRACTION - bai-thuc-hanh-01.pdf")
print("="*80)

# Method 1: pypdf
print("\n[1] TRYING: pypdf")
print("-"*80)
try:
    from pypdf import PdfReader
    reader = PdfReader(pdf_file)
    text = ''.join([page.extract_text() or '' for page in reader.pages])
    print(f"✓ SUCCESS - Extracted {len(text)} characters")
    print("\nFIRST 2000 CHARACTERS:")
    print(text[:2000])
    print("\n...")
    print("LAST 1000 CHARACTERS:")
    print(text[-1000:])
    
    # Save full text
    with open('extracted_pypdf.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"\n✓ Full text saved to: extracted_pypdf.txt")
    sys.exit(0)
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")

# Method 2: pdfplumber
print("\n[2] TRYING: pdfplumber")
print("-"*80)
try:
    import pdfplumber
    with pdfplumber.open(pdf_file) as pdf:
        text = ''.join([page.extract_text() or '' for page in pdf.pages])
    print(f"✓ SUCCESS - Extracted {len(text)} characters")
    print("\nFIRST 2000 CHARACTERS:")
    print(text[:2000])
    print("\n...")
    print("LAST 1000 CHARACTERS:")
    print(text[-1000:])
    
    with open('extracted_pdfplumber.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"\n✓ Full text saved to: extracted_pdfplumber.txt")
    sys.exit(0)
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")

# Method 3: pdftotext (command line)
print("\n[3] TRYING: pdftotext (CLI)")
print("-"*80)
try:
    result = subprocess.run(['pdftotext', pdf_file, '-'], capture_output=True, text=True, timeout=30)
    if result.returncode == 0 and result.stdout:
        text = result.stdout
        print(f"✓ SUCCESS - Extracted {len(text)} characters")
        print("\nFIRST 2000 CHARACTERS:")
        print(text[:2000])
        print("\n...")
        print("LAST 1000 CHARACTERS:")
        print(text[-1000:])
        
        with open('extracted_pdftotext.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"\n✓ Full text saved to: extracted_pdftotext.txt")
        sys.exit(0)
    else:
        print(f"✗ FAILED: Return code {result.returncode}")
        if result.stderr:
            print(f"Error: {result.stderr[:500]}")
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")

# Method 4: mutool
print("\n[4] TRYING: mutool")
print("-"*80)
try:
    result = subprocess.run(['mutool', 'draw', '-F', 'text', pdf_file], capture_output=True, text=True, timeout=30)
    if result.returncode == 0 and result.stdout:
        text = result.stdout
        print(f"✓ SUCCESS - Extracted {len(text)} characters")
        print("\nFIRST 2000 CHARACTERS:")
        print(text[:2000])
        print("\n...")
        print("LAST 1000 CHARACTERS:")
        print(text[-1000:])
        
        with open('extracted_mutool.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"\n✓ Full text saved to: extracted_mutool.txt")
        sys.exit(0)
    else:
        print(f"✗ FAILED: Return code {result.returncode}")
        if result.stderr:
            print(f"Error: {result.stderr[:500]}")
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")

# Method 5: tesseract OCR
print("\n[5] TRYING: tesseract (OCR)")
print("-"*80)
try:
    result = subprocess.run(['tesseract', pdf_file, 'stdout'], capture_output=True, text=True, timeout=60)
    if result.returncode == 0 and result.stdout:
        text = result.stdout
        print(f"✓ SUCCESS - Extracted {len(text)} characters")
        print("\nFIRST 2000 CHARACTERS:")
        print(text[:2000])
        print("\n...")
        print("LAST 1000 CHARACTERS:")
        print(text[-1000:])
        
        with open('extracted_tesseract.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"\n✓ Full text saved to: extracted_tesseract.txt")
        sys.exit(0)
    else:
        print(f"✗ FAILED: Return code {result.returncode}")
        if result.stderr:
            print(f"Error: {result.stderr[:500]}")
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")

print("\n" + "="*80)
print("ALL METHODS FAILED")
print("="*80)
