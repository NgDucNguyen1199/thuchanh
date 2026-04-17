#!/usr/bin/env python3
"""
PDF text extraction - tries multiple methods in order
"""
import os
import sys

os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')
pdf_file = 'bai-thuc-hanh-01.pdf'

print("="*70)
print("PDF TEXT EXTRACTION TEST - bai-thuc-hanh-01.pdf")
print("="*70)

methods = {
    'pypdf': lambda: _try_pypdf(),
    'pdfplumber': lambda: _try_pdfplumber(),
    'pdftotext': lambda: _try_pdftotext(),
    'mutool': lambda: _try_mutool(),
    'tesseract': lambda: _try_tesseract(),
}

def _try_pypdf():
    try:
        from pypdf import PdfReader
        reader = PdfReader(pdf_file)
        text = ''.join([page.extract_text() or '' for page in reader.pages])
        return text[:1500]
    except Exception as e:
        return f"FAILED: {e}"

def _try_pdfplumber():
    try:
        import pdfplumber
        with pdfplumber.open(pdf_file) as pdf:
            text = ''.join([page.extract_text() or '' for page in pdf.pages])
        return text[:1500]
    except Exception as e:
        return f"FAILED: {e}"

def _try_pdftotext():
    try:
        import subprocess
        result = subprocess.run(['pdftotext', pdf_file, '-'], capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            return result.stdout[:1500]
        else:
            return f"FAILED: {result.stderr}"
    except Exception as e:
        return f"FAILED: {e}"

def _try_mutool():
    try:
        import subprocess
        result = subprocess.run(['mutool', 'draw', '-F', 'text', pdf_file], capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            return result.stdout[:1500]
        else:
            return f"FAILED: {result.stderr}"
    except Exception as e:
        return f"FAILED: {e}"

def _try_tesseract():
    try:
        import subprocess
        result = subprocess.run(['tesseract', pdf_file, 'stdout'], capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            return result.stdout[:1500]
        else:
            return f"FAILED: {result.stderr}"
    except Exception as e:
        return f"FAILED: {e}"

# Test each method
for method_name in ['pypdf', 'pdfplumber', 'pdftotext', 'mutool', 'tesseract']:
    print(f"\n[{method_name.upper()}]")
    print("-" * 70)
    result = methods[method_name]()
    if 'FAILED' in result:
        print(result)
    else:
        print(f"SUCCESS - First 1500 characters:\n")
        print(result)
        print("\n[Continuing with full extraction...]")
        break

print("\n" + "="*70)
