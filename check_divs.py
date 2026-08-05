import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

div_open = len(re.findall(r'<div\b[^>]*>', html))
div_close = len(re.findall(r'</div>', html))

print(f"Open divs: {div_open}, Close divs: {div_close}")
