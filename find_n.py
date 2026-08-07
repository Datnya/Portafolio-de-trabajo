with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
import re
match = re.search(r'\\n', html)
if match:
    print(f"Found at index {match.start()} context: {html[match.start()-50:match.start()+50]}")
