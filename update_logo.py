import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('assets/apm-logo.svg', 'assets/LOGO APM.jpg')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
