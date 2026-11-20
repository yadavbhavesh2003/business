# UdyamOS UI designs (local copy)

All 158 screens from the design canvas, as files you can open, edit and hand to developers.
Sample data only.

## Open in the browser
XAMPP must be running. Then open:

**http://localhost/businessMitra/design/export/**

The index lists every screen by folder. Links between screens work, like Play on the canvas.
Opening the files by double-click (file://) won't work, because the browser blocks loading them; use the localhost link.

## Folders
| Folder | What |
|---|---|
| `export/01-web-app-core` … `10-later-releases` | Ready-to-open screens, one folder per canvas page |
| `export/_shared/Sidebar.html` | Web sidebar used by every web screen |
| `export/_runtime/dc-runtime.js` | Small script that renders the screens in a normal browser |
| `out/project/` | Same screens in canvas format (`.dc.html`) + `canvas.json`, for publishing back |
| `pages_*.py` | Screen content (text, numbers, tables): edit these |
| `bespoke/` | Hand-built screens (Dashboard, Approvals, Android Home, Drawer, Billing, Outstanding) |
| `links.py` | Which button/row opens which screen |

## Change a screen and rebuild
```
cd design
python3 gen.py out/project && cp bespoke/*.dc.html out/project/ && python3 layout.py out/project && python3 export.py
```
Then refresh the browser. To update the online canvas, ask Claude to publish `out/project/`.
