import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace(r'\n</div>\n<!-- Contact Form -->', '\n</div>\n<!-- Contact Form -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
