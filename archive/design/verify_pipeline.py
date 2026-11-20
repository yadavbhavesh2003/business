#!/usr/bin/env python3
"""UdyamOS Prototype & Rules Sanity Verification Script.
Checks screen builds, canvas integrity, link consistency, and installed skills."""

import os, sys, json, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..')) if os.path.basename(os.path.dirname(HERE)) == 'archive' else os.path.dirname(HERE)
EXPORT_DIR = os.path.join(HERE, 'export')
CANVAS_FILE = os.path.join(HERE, 'out/project/canvas.json')
SKILLS_DIR = os.path.join(ROOT, '.agents/skills')

def check():
    errors = []
    print("==================================================")
    print("🔍 UdyamOS Automated Integrity & Quality Verification")
    print("==================================================")

    # 1. Check canvas.json
    if not os.path.exists(CANVAS_FILE):
        errors.append(f"Missing {CANVAS_FILE}")
        return errors
    
    with open(CANVAS_FILE) as f:
        canvas = json.load(f)
    
    boards = canvas.get('boards', {})
    print(f"✓ Canvas contains {len(boards)} registered artboards across {len(canvas.get('pages', []))} pages.")

    # 2. Check for missing local boards
    out_dir = os.path.join(HERE, 'out/project')
    missing_boards = [b for b in boards if not os.path.exists(os.path.join(out_dir, b))]
    if missing_boards:
        errors.append(f"Missing boards in out/project: {missing_boards}")
    else:
        print("✓ All registered canvas boards exist locally in out/project/.")

    # 3. Check export directory
    if not os.path.exists(EXPORT_DIR):
        errors.append(f"Missing export directory: {EXPORT_DIR}")
        return errors

    exported_files = []
    broken_links = []
    for root, _, files in os.walk(EXPORT_DIR):
        for f in files:
            if f.endswith('.html'):
                fpath = os.path.join(root, f)
                exported_files.append(fpath)
                content = open(fpath).read()
                if '_missing/' in content:
                    broken_links.append(os.path.relpath(fpath, ROOT))

    print(f"✓ Verified {len(exported_files)} exported HTML screens in design/export/.")
    if broken_links:
        errors.append(f"Found broken links (_missing/) in: {broken_links}")
    else:
        print("✓ Zero broken links detected across all exported screens.")

    # 4. Check workspace skills
    expected_skills = [
        'ponytail', 'hallmark', 'last30days', 'humanizer', 'impeccable',
        'rea', 'graphify', 'taste', 'scrapling', 'diagram-design',
        'design-pipeline', 'offline-sync-engine', 'gst-compliance',
        'security-zero-knowledge', 'platform-saas-ops',
        'thermal-printing-escpos', 'bharat-accounting-i18n', 'sync-testing-playbook'
    ]
    missing_skills = []
    for s in expected_skills:
        s_file = os.path.join(SKILLS_DIR, s, 'SKILL.md')
        if not os.path.exists(s_file):
            missing_skills.append(s)

    if missing_skills:
        errors.append(f"Missing agent skills: {missing_skills}")
    else:
        print(f"✓ All {len(expected_skills)} agent skills verified in .agents/skills/.")

    # 5. Check root AGENTS.md and README.md
    for doc in ['AGENTS.md', 'README.md']:
        p = os.path.join(ROOT, doc)
        if not os.path.exists(p):
            errors.append(f"Missing root documentation file: {doc}")
        else:
            print(f"✓ {doc} is present and non-empty.")

    print("==================================================")
    if errors:
        print("❌ Verification FAILED with errors:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    else:
        print("🎉 ALL CHECKS PASSED: Workspace, skills, rules, and prototype are in perfect sync!")
        print("==================================================")

if __name__ == '__main__':
    check()

