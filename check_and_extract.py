#!/usr/bin/env python3
"""Check dependencies and attempt PDF extraction"""
import os
import sys

os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')

print("="*80)
print("DEPENDENCY CHECK")
print("="*80)

# Check for pypdf
try:
    from pypdf import PdfReader
    print("✓ pypdf is installed")
    HAS_PYPDF = True
except ImportError:
    print("✗ pypdf NOT installed")
    HAS_PYPDF = False

# Check for pdfplumber
try:
    import pdfplumber
    print("✓ pdfplumber is installed")
    HAS_PDFPLUMBER = True
except ImportError:
    print("✗ pdfplumber NOT installed")
    HAS_PDFPLUMBER = False

# Check for subprocess (always available)
import subprocess
print("✓ subprocess is available")

# Try pdftotext
try:
    result = subprocess.run(['pdftotext', '--version'], capture_output=True, timeout=5)
    if result.returncode == 0:
        print("✓ pdftotext CLI is available")
        HAS_PDFTOTEXT = True
    else:
        print("✗ pdftotext CLI returned error")
        HAS_PDFTOTEXT = False
except Exception as e:
    print(f"✗ pdftotext CLI not found: {e}")
    HAS_PDFTOTEXT = False

print("\n" + "="*80)
print("EXTRACTION ATTEMPT")
print("="*80)

pdf_file = 'bai-thuc-hanh-01.pdf'

# Try pypdf if available
if HAS_PYPDF:
    print("\n[1] Attempting extraction with pypdf...")
    try:
        from pypdf import PdfReader
        reader = PdfReader(pdf_file)
        text = ''.join([page.extract_text() or '' for page in reader.pages])
        
        if text:
            print(f"✓ SUCCESS - Extracted {len(text)} characters from {len(reader.pages)} pages")
            print("\nFIRST 2000 CHARACTERS:")
            print(text[:2000])
            print("\n... [content truncated] ...\n")
            print("LAST 1000 CHARACTERS:")
            print(text[-1000:])
            
            # Save file
            output_file = 'extracted_pypdf.txt'
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"\n✓ Full text saved to: {os.path.abspath(output_file)}")
            sys.exit(0)
        else:
            print("✗ pypdf extracted empty text")
    except Exception as e:
        print(f"✗ pypdf failed: {type(e).__name__}: {e}")

# Try pdfplumber if available
if HAS_PDFPLUMBER:
    print("\n[2] Attempting extraction with pdfplumber...")
    try:
        import pdfplumber
        with pdfplumber.open(pdf_file) as pdf:
            text = ''.join([page.extract_text() or '' for page in pdf.pages])
        
        if text:
            print(f"✓ SUCCESS - Extracted {len(text)} characters from {len(pdf.pages)} pages")
            print("\nFIRST 2000 CHARACTERS:")
            print(text[:2000])
            print("\n... [content truncated] ...\n")
            print("LAST 1000 CHARACTERS:")
            print(text[-1000:])
            
            # Save file
            output_file = 'extracted_pdfplumber.txt'
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"\n✓ Full text saved to: {os.path.abspath(output_file)}")
            sys.exit(0)
        else:
            print("✗ pdfplumber extracted empty text")
    except Exception as e:
        print(f"✗ pdfplumber failed: {type(e).__name__}: {e}")

# Try pdftotext if available
if HAS_PDFTOTEXT:
    print("\n[3] Attempting extraction with pdftotext CLI...")
    try:
        result = subprocess.run(['pdftotext', pdf_file, '-'], capture_output=True, text=True, timeout=30)
        if result.returncode == 0 and result.stdout:
            text = result.stdout
            print(f"✓ SUCCESS - Extracted {len(text)} characters")
            print("\nFIRST 2000 CHARACTERS:")
            print(text[:2000])
            print("\n... [content truncated] ...\n")
            print("LAST 1000 CHARACTERS:")
            print(text[-1000:])
            
            # Save file
            output_file = 'extracted_pdftotext.txt'
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"\n✓ Full text saved to: {os.path.abspath(output_file)}")
            sys.exit(0)
        else:
            print(f"✗ pdftotext failed with return code {result.returncode}")
            if result.stderr:
                print(f"   Error: {result.stderr[:200]}")
    except Exception as e:
        print(f"✗ pdftotext failed: {type(e).__name__}: {e}")

print("\n" + "="*80)
print("RESULT: No extraction method succeeded")
print("="*80)
print("\nRECOMMENDATION: Install required dependencies:")
if not HAS_PYPDF:
    print("  pip install pypdf")
if not HAS_PDFPLUMBER:
    print("  pip install pdfplumber")
print("\nOR install system tools:")
print("  - pdftotext (from poppler)")
print("  - tesseract-ocr")

sys.exit(1)
