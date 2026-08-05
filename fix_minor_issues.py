# -*- coding: utf-8 -*-
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Title "Mis Proyectos" -> "Mis Servicios"
html = html.replace('<h2 class="section-title">Mis <span>Proyectos</span></h2>', '<h2 class="section-title">Mis <span>Servicios</span></h2>')

# 2. Hook "Caso de Éxito" -> "Mis Proyectos"
# Wait, let's just add an h2 for "Mis Proyectos" inside the panel, or change the badge. The user said:
# "al dar click a uno de los servicios recién debería de salir como hook 'mis proyectos' y abajo ver el caso de exito que he colocado"
# Let's change the badge text "Caso de Éxito" to "Mis Proyectos" for all hooks.
html = html.replace('Caso de Éxito\\n                        </div>', 'Mis Proyectos\\n                        </div>')
# Wait, the exact text is Caso de Éxito\\n                        </div>. Let's just do a regex.
html = re.sub(r'Caso de Éxito\s*</div>', r'Mis Proyectos\n                        </div>', html)

# 3. Bigger service cards in CSS
# We can increase the padding of .service-card-content, or give .service-card a min-height.
# Let's change .service-card-content padding to 2rem and h3 font-size to --fs-h4
css = css.replace('padding: 1.5rem;', 'padding: 2.5rem;')
# .service-card-content h3 { ... font-size: var(--fs-body);
css = css.replace('font-size: var(--fs-body);\\n    font-weight: 700;\\n    color: var(--black);\\n    margin-bottom: 0.25rem;', 'font-size: var(--fs-h4);\\n    font-weight: 700;\\n    color: var(--black);\\n    margin-bottom: 0.5rem;')

# .service-card-content p { ... font-size: var(--fs-xs);
css = css.replace('font-size: var(--fs-xs);\\n    color: var(--gray-500);\\n    line-height: 1.4;', 'font-size: var(--fs-small);\\n    color: var(--gray-500);\\n    line-height: 1.5;')

# 4. Remove borders from .raw-gif
# .raw-gif {
#    width: 100%;
#    height: auto;
#    border-radius: var(--radius-lg);
#    box-shadow: var(--shadow-md);
#    border: 1px solid var(--gray-200);
#    display: block;
# }
old_raw_gif = '''.raw-gif {
    width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--gray-200);
    display: block;
}'''
new_raw_gif = '''.raw-gif {
    width: 100%;
    height: auto;
    display: block;
    /* Removed borders and shadow as requested */
}'''
css = css.replace(old_raw_gif, new_raw_gif)

# Why are gifs below the box?
# Because project-layout-split is:
# display: grid; grid-template-columns: 1fr 1fr;
# Maybe we can increase max-width of container if it's wrapping, but grid shouldn't wrap unless in media query.
# Let's change grid to 1.3fr 0.7fr or something.
css = css.replace('grid-template-columns: 1fr 1fr;', 'grid-template-columns: 1.2fr 0.8fr;')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

