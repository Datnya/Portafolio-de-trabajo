with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix literal \n
html = html.replace('\\n<div class="contact-left-col">', '\n<div class="contact-left-col">')
html = html.replace('\\n</div>\\n<!-- Contact Form -->', '\n</div>\n<!-- Contact Form -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
