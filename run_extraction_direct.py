#!/usr/bin/env python3
"""Direct execution of extract_full.py with comprehensive output"""
import os
import sys

# Change to the target directory
os.chdir(r'C:\Users\pho21\Downloads\CCNMTPTPM')

# Execute the extraction script directly
if __name__ == '__main__':
    try:
        with open('extract_full.py', 'r', encoding='utf-8') as f:
            code = f.read()
        exec(code)
    except SystemExit as e:
        sys.exit(e.code if e.code is not None else 0)
    except Exception as e:
        print(f"Error executing script: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
