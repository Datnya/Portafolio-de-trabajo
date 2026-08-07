with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
contact_section = re.search(r'<section class="contact" id="contacto">.*?</section>', html, flags=re.DOTALL)
if contact_section:
    print(contact_section.group(0))
