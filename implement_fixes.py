# -*- coding: utf-8 -*-
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Move Stats section right below Hero
stats_pattern = r'(<!-- ======================== STATS SECTION ======================== -->.*?</section>)'
stats_match = re.search(stats_pattern, html, re.DOTALL)
if stats_match:
    stats_html = stats_match.group(1)
    # Remove stats from original location
    html = html.replace(stats_html, '')
    
    # Remove orange icons from stats
    stats_html = re.sub(r'<div class="stat-icon">.*?</div>', '', stats_html, flags=re.DOTALL)
    
    # Find hero end and insert stats
    hero_end = '</section>\\n\\n    <!-- ======================== SERVICES SECTION ======================== -->'
    html = html.replace(hero_end, '</section>\\n\\n    ' + stats_html + '\\n\\n    <!-- ======================== SERVICES SECTION ======================== -->')

# 2. Append " y personas"
html = html.replace('Casos de éxito que demuestran resultados reales para empresas', 'Casos de éxito que demuestran resultados reales para empresas y personas')

# 3. Flex layout for .project-layout-split to guarantee side-by-side
split_old = '''/* Layout Split */
.project-layout-split {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 3rem;
    align-items: start;
}'''
split_new = '''/* Layout Split */
.project-layout-split {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    align-items: flex-start;
}
.project-layout-split > .project-card {
    flex: 1.5;
    min-width: 0; /* Prevents flex blowout */
}
.project-layout-split > .project-gifs {
    flex: 1;
    min-width: 0;
}'''
css = css.replace(split_old, split_new)

# 4. Make GIFs smaller
gif_old = '''.raw-gif {
    width: 100%;
    height: auto;
    display: block;
    /* Removed borders and shadow as requested */
}'''
gif_new = '''.raw-gif {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    height: auto;
    display: block;
    cursor: pointer;
    transition: transform 0.3s ease;
}
.raw-gif:hover {
    transform: scale(1.02);
}'''
css = css.replace(gif_old, gif_new)

# 5. Fix tabs missing data-tab or content issues
# Let's ensure the JS adds 'active' correctly. The JS looks fine, maybe it's just a typo in the user's browser cache.
# We'll re-inject the JS just in case.

# 6. Add Lightbox CSS
lightbox_css = '''
/* Lightbox Modal */
.lightbox {
    display: none;
    position: fixed;
    z-index: 9999;
    padding-top: 50px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.9);
}
.lightbox.active {
    display: flex;
    align-items: center;
    justify-content: center;
}
.lightbox-content {
    margin: auto;
    display: block;
    max-width: 90%;
    max-height: 90vh;
    animation: zoom 0.3s;
    border-radius: var(--radius-md);
}
.lightbox-close {
    position: absolute;
    top: 20px;
    right: 40px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}
.lightbox-close:hover {
    color: var(--primary);
}
@keyframes zoom {
    from {transform:scale(0.8); opacity: 0;}
    to {transform:scale(1); opacity: 1;}
}
'''
css += lightbox_css

# 7. Add Lightbox JS
lightbox_js = '''
/* ================================================
   LIGHTBOX
   ================================================ */
function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = 
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
    ;
    document.body.appendChild(lightbox);
    const lightboxImg = document.getElementById('lightbox-img');

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('raw-gif') || (e.target.tagName === 'IMG' && e.target.closest('.project-panel'))) {
            lightbox.classList.add('active');
            lightboxImg.src = e.target.src;
        } else if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
        }
    });
}
'''
js = js.replace('initProjectTabs();', 'initProjectTabs();\\n    initLightbox();')
js += lightbox_js

# Ensure Responsive Layout overrides flex
media_queries = '''    .project-layout-split {
        grid-template-columns: 1fr;
    }'''
new_media_queries = '''    .project-layout-split {
        flex-direction: column;
    }'''
css = css.replace(media_queries, new_media_queries)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

