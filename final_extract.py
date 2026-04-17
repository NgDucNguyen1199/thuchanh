#!/usr/bin/env python3
"""
Final comprehensive PDF extraction script
Handles missing dependencies and provides detailed output
"""
import os
import sys
import json
from pathlib import Path

os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')

print("="*80)
print("PDF TEXT EXTRACTION SYSTEM")
print("="*80)
print(f"Working directory: {os.getcwd()}")
print(f"Python: {sys.executable}")
print(f"Python version: {sys.version}")

results = {
    "timestamp": str(Path.cwd()),
    "pdf_file": "bai-thuc-hanh-01.pdf",
    "methods": {},
    "success": False,
    "extracted_files": []
}

pdf_file = "bai-thuc-hanh-01.pdf"

if not os.path.exists(pdf_file):
    print(f"\nERROR: {pdf_file} not found in {os.getcwd()}")
    print(f"Files in directory: {os.listdir('.')}")
    sys.exit(1)

# Check and install if needed
def check_and_install():
    """Check for required packages and suggest installation"""
    missing = []
    
    try:
        import pypdf
        print("✓ pypdf is available")
    except ImportError:
        missing.append("pypdf")
        print("✗ pypdf not found - install with: pip install pypdf")
    
    try:
        import pdfplumber
        print("✓ pdfplumber is available")
    except ImportError:
        missing.append("pdfplumber")
        print("✗ pdfplumber not found - install with: pip install pdfplumber")
    
    return missing

print("\n" + "="*80)
print("STEP 1: Checking dependencies")
print("="*80)
missing_packages = check_and_install()

# Attempt installation if pypdf is missing
if missing_packages and "pypdf" in missing_packages:
    print("\nAttempting to install pypdf...")
    import subprocess
    try:
        result = subprocess.run([sys.executable, "-m", "pip", "install", "pypdf", "-q"], 
                              timeout=120, capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ pypdf installed successfully")
            missing_packages.remove("pypdf")
        else:
            print(f"✗ Installation failed: {result.stderr[:200]}")
    except Exception as e:
        print(f"✗ Installation error: {e}")

# Attempt installation if pdfplumber is missing
if missing_packages and "pdfplumber" in missing_packages:
    print("\nAttempting to install pdfplumber...")
    import subprocess
    try:
        result = subprocess.run([sys.executable, "-m", "pip", "install", "pdfplumber", "-q"], 
                              timeout=120, capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ pdfplumber installed successfully")
            missing_packages.remove("pdfplumber")
        else:
            print(f"✗ Installation failed: {result.stderr[:200]}")
    except Exception as e:
        print(f"✗ Installation error: {e}")

print("\n" + "="*80)
print("STEP 2: Attempting extraction")
print("="*80)

# Method 1: pypdf
print("\n[1] Method: pypdf")
print("-"*80)
try:
    from pypdf import PdfReader
    reader = PdfReader(pdf_file)
    num_pages = len(reader.pages)
    text = ''.join([page.extract_text() or '' for page in reader.pages])
    
    if text and len(text) > 100:  # Meaningful extraction
        print(f"✓ SUCCESS")
        print(f"   Pages: {num_pages}")
        print(f"   Characters: {len(text)}")
        print(f"\n   First 2000 characters:")
        print(f"   {text[:2000]}")
        print(f"\n   ... [truncated] ...\n")
        print(f"   Last 500 characters:")
        print(f"   {text[-500:]}")
        
        output_file = 'extracted_pypdf.txt'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(text)
        
        results["success"] = True
        results["methods"]["pypdf"] = {
            "status": "success",
            "pages": num_pages,
            "characters": len(text),
            "output_file": os.path.abspath(output_file)
        }
        results["extracted_files"].append(os.path.abspath(output_file))
        
        print(f"\n   ✓ Saved to: {os.path.abspath(output_file)}")
        print("\n" + "="*80)
        print("EXTRACTION COMPLETED SUCCESSFULLY")
        print("="*80)
        print(json.dumps(results, indent=2))
        sys.exit(0)
    else:
        print(f"✗ Extracted only {len(text)} characters (too little)")
        results["methods"]["pypdf"] = {"status": "failed", "reason": "insufficient content"}
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
    results["methods"]["pypdf"] = {"status": "failed", "error": f"{type(e).__name__}: {str(e)[:100]}"}

# Method 2: pdfplumber
print("\n[2] Method: pdfplumber")
print("-"*80)
try:
    import pdfplumber
    with pdfplumber.open(pdf_file) as pdf:
        num_pages = len(pdf.pages)
        text = ''.join([page.extract_text() or '' for page in pdf.pages])
    
    if text and len(text) > 100:
        print(f"✓ SUCCESS")
        print(f"   Pages: {num_pages}")
        print(f"   Characters: {len(text)}")
        print(f"\n   First 2000 characters:")
        print(f"   {text[:2000]}")
        print(f"\n   ... [truncated] ...\n")
        print(f"   Last 500 characters:")
        print(f"   {text[-500:]}")
        
        output_file = 'extracted_pdfplumber.txt'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(text)
        
        results["success"] = True
        results["methods"]["pdfplumber"] = {
            "status": "success",
            "pages": num_pages,
            "characters": len(text),
            "output_file": os.path.abspath(output_file)
        }
        results["extracted_files"].append(os.path.abspath(output_file))
        
        print(f"\n   ✓ Saved to: {os.path.abspath(output_file)}")
        print("\n" + "="*80)
        print("EXTRACTION COMPLETED SUCCESSFULLY")
        print("="*80)
        print(json.dumps(results, indent=2))
        sys.exit(0)
    else:
        print(f"✗ Extracted only {len(text)} characters (too little)")
        results["methods"]["pdfplumber"] = {"status": "failed", "reason": "insufficient content"}
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
    results["methods"]["pdfplumber"] = {"status": "failed", "error": f"{type(e).__name__}: {str(e)[:100]}"}

# CLI tools
print("\n[3] Method: pdftotext (CLI)")
print("-"*80)
try:
    import subprocess
    result = subprocess.run(['pdftotext', pdf_file, '-'], 
                          capture_output=True, text=True, timeout=30)
    if result.returncode == 0 and result.stdout and len(result.stdout) > 100:
        text = result.stdout
        print(f"✓ SUCCESS")
        print(f"   Characters: {len(text)}")
        print(f"\n   First 2000 characters:")
        print(f"   {text[:2000]}")
        print(f"\n   ... [truncated] ...\n")
        print(f"   Last 500 characters:")
        print(f"   {text[-500:]}")
        
        output_file = 'extracted_pdftotext.txt'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(text)
        
        results["success"] = True
        results["methods"]["pdftotext"] = {
            "status": "success",
            "characters": len(text),
            "output_file": os.path.abspath(output_file)
        }
        results["extracted_files"].append(os.path.abspath(output_file))
        
        print(f"\n   ✓ Saved to: {os.path.abspath(output_file)}")
        print("\n" + "="*80)
        print("EXTRACTION COMPLETED SUCCESSFULLY")
        print("="*80)
        print(json.dumps(results, indent=2))
        sys.exit(0)
    else:
        print(f"✗ Return code: {result.returncode}, Output: {len(result.stdout)} chars")
        results["methods"]["pdftotext"] = {"status": "failed", "error": f"return_code {result.returncode}"}
except Exception as e:
    print(f"✗ FAILED: {type(e).__name__}: {e}")
    results["methods"]["pdftotext"] = {"status": "failed", "error": f"{type(e).__name__}: {str(e)[:100]}"}

print("\n" + "="*80)
print("ALL METHODS FAILED")
print("="*80)
print(json.dumps(results, indent=2))
print("\nTo fix this, please install Python packages:")
print("  pip install pypdf pdfplumber")
sys.exit(1)
