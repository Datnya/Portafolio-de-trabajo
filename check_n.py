with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
matches = re.finditer(r'\\n', html)
for m in matches:
    print(f"Found literal \\\\n at {m.start()} : {html[m.start()-20:m.start()+20]}")
