"""Folder-wise local export: python3 export.py  ->  design/export/<NN-page>/<Screen>.html + index.html
Open via XAMPP: http://localhost/businessMitra/design/export/"""
import json, os, re, shutil
HERE = os.path.dirname(os.path.abspath(__file__))
SRC, DST = os.path.join(HERE, 'out/project'), os.path.join(HERE, 'export')
idx = json.load(open(os.path.join(SRC, 'canvas.json')))
pages = idx['pages']
slug = lambda s: re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
folder = {p['id']: '%02d-%s' % (i + 1, slug(p['name'])) for i, p in enumerate(pages)}
where = {f: folder[b.get('page', pages[0]['id'])] for f, b in idx['boards'].items()}
where['Sidebar.dc.html'] = '_shared'
where['PlatformSidebar.dc.html'] = '_shared'
if os.path.exists(DST): shutil.rmtree(DST)
os.makedirs(os.path.join(DST, '_runtime')); os.makedirs(os.path.join(DST, '_shared'))
shutil.copy(os.path.join(HERE, 'runtime/dc-runtime.js'), os.path.join(DST, '_runtime/dc-runtime.js'))
def fix(src):
    src = src.replace('<script src="./support.js"></script>', '<script>window.DC_IMPORT_BASE = "../_shared/";</script>\n<script src="../_runtime/dc-runtime.js"></script>')
    # links built in code (Sidebar, MobileDrawer: file + '.dc.html') can't be rewritten statically -> resolve via DC_HREF
    src = re.sub(r'''([A-Za-z0-9_.\]\)]+)\s*\+\s*(['"])\.dc\.html\2''', r'window.DC_HREF(\1)', src)
    src = re.sub(r'([A-Za-z0-9_]+)\.dc\.html', lambda m: '../%s/%s.html' % (where.get(m.group(0), '_missing'), m.group(1)), src)
    return src.replace('window.DC_IMPORT_BASE = "../_shared/";', 'window.DC_IMPORT_BASE = "../_shared/"; window.DC_WHERE = %s; window.DC_HREF = function (n) { return "../" + (window.DC_WHERE[n] || "_missing") + "/" + n + ".html"; };' % json.dumps({k[:-8]: v for k, v in where.items()}))
count = 0
for f in sorted(os.listdir(SRC)):
    if not f.endswith('.dc.html'): continue
    d = os.path.join(DST, where.get(f, '_unplaced')); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, f[:-8] + '.html'), 'w').write(fix(open(os.path.join(SRC, f)).read())); count += 1
rows = []
for p in pages:
    items = [(f, b['title']) for f, b in idx['boards'].items() if b.get('page') == p['id']]
    rows.append('<h2>%s <small>(%d)</small></h2><ul>%s</ul>' % (p['name'], len(items), ''.join(
        '<li><a href="%s/%s.html">%s</a></li>' % (folder[p['id']], f[:-8], t) for f, t in items)))
open(os.path.join(DST, 'index.html'), 'w').write('''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>UdyamOS screens</title>
<style>body{font-family:Inter,system-ui,sans-serif;margin:40px;color:#15181C;background:#F6F7F5}h1{margin:0 0 8px}h2{margin-top:32px;font-size:18px}
small{color:#5B616B;font-weight:400}ul{columns:3;padding-left:18px}li{margin:4px 0}a{color:#0F766E}</style></head><body>
<h1>UdyamOS · all screens</h1><p>Sample data only. Start at <a href="%s/Main.html">Client web dashboard</a> · <a href="%s/MobileHome.html">Client Android home</a> · <b><a href="%s/PlatformHome.html">UdyamOS platform admin (our team: all companies &amp; clients)</a></b>.</p>%s</body></html>'''
  % (where['Main.dc.html'], where['MobileHome.dc.html'], where['PlatformHome.dc.html'], ''.join(rows)))
print(count, 'screens exported into', len(set(where.values())), 'folders')
