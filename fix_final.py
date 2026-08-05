import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Navbar icons
nav_links_pattern = r'(<div class="nav-links" id="navLinks">.*?</nav>)'
nav_icons = '''
            <div class="nav-social">
                <a href="https://www.linkedin.com/in/datnya-monz%C3%B3n-9839a0356/" target="_blank" class="nav-icon" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.instagram.com/foxystudio.digital/" target="_blank" class="nav-icon" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
            </div>
'''
def repl_nav(m):
    return m.group(0).replace('</nav>', nav_icons + '\\n        </nav>')
html = re.sub(nav_links_pattern, repl_nav, html, flags=re.DOTALL)

# 2. Client Logo
logo_html = '''<div class="client-logo-wrapper" style="margin-bottom: 1.5rem;">
                                <img src="assets/apm-logo.svg" alt="APM GROUP" style="height: 40px; width: auto;">
                            </div>
'''
html = html.replace('<div class="hook-badge">', logo_html + '                            <div class="hook-badge">', 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 3. Create SVG
os.makedirs('assets', exist_ok=True)
svg_content = '''<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="60" fill="transparent"/>
  <text x="0" y="40" font-family="sans-serif" font-size="30" font-weight="bold" fill="#000000">APM GROUP</text>
</svg>
'''
with open('assets/apm-logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

# 4. CSS Updates
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Contact layout fixes
css = css.replace('.contact-form-wrapper {\\n    margin-top: 4rem;', '.contact-form-wrapper {\\n    margin-top: 0;')
# Remove grid-template-columns: 1fr; from tablet query
css = css.replace('    .contact-grid {\\n        grid-template-columns: 1fr;\\n    }\\n', '')
# Ensure mobile query has it (it already does from earlier edits)

# Make GIFs wider
# Old: flex: 2.2 / 0.8
# New: flex: 1.8 / 1.2, gap: 2rem
split_old = '''.project-layout-split {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    align-items: flex-start;
}
.project-layout-split > .project-card {
    flex: 2.2; /* Much larger left column */
    min-width: 0;
}
.project-layout-split > .project-gifs {
    flex: 0.8; /* Smaller right column */
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* Tighter gap between GIFs */
}'''
split_new = '''.project-layout-split {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: flex-start;
    padding-right: 1rem; /* approx 1cm from right edge */
}
.project-layout-split > .project-card {
    flex: 1.8;
    min-width: 0;
}
.project-layout-split > .project-gifs {
    flex: 1.3;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}'''
css = css.replace(split_old, split_new)

# Remove max-width on GIFs
css = css.replace('max-width: 320px;', 'max-width: 100%;')

# Nav icons CSS
css += '''
.nav-social {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: 2rem;
}
.nav-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: var(--white);
    transition: all 0.3s ease;
}
.nav-icon:hover {
    background: var(--primary);
    transform: translateY(-2px);
}
.nav-icon svg {
    width: 16px;
    height: 16px;
}
@media (max-width: 768px) {
    .nav-social {
        margin-left: 0;
        margin-top: 1rem;
    }
}
'''
with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

