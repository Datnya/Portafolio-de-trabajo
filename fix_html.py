# -*- coding: utf-8 -*-
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# We need to rebuild the panels properly.
# The panels start at <div class="project-panel active" id="panel-web">
# and end at <!-- ======================== CONTACT SECTION ======================== -->

pattern = r'(<div class="project-panel active" id="panel-web">.*?)(\s*<!-- ======================== CONTACT SECTION ======================== -->)'
match = re.search(pattern, html, re.DOTALL)

panels_html = '''
            <!-- ===== TAB: Páginas Web ===== -->
            <div class="project-panel active" id="panel-web">
                <div class="project-layout-split animate-on-scroll fade-up">
                    <div class="project-card">
                        <div class="project-hook">
                            <div class="hook-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                Mis Proyectos
                            </div>
                            <h3 class="hook-title">Modernización y automatización de una página web corporativa</h3>
                        </div>

                        <div class="project-body project-body-single">
                            <div class="project-info">
                                <div class="project-dual">
                                    <div class="dual-card challenge">
                                        <div class="dual-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                        </div>
                                        <h4>El Reto</h4>
                                        <p>Una página web desactualizada que no reflejaba la calidad de la empresa y requería constantes actualizaciones manuales.</p>
                                    </div>
                                    <div class="dual-card solution">
                                        <div class="dual-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                                        </div>
                                        <h4>La Solución</h4>
                                        <p>Rediseñé completamente el sitio e incorporé herramientas interactivas y automatizaciones para mejorar la experiencia del usuario y reducir tareas manuales.</p>
                                    </div>
                                </div>

                                <div class="project-results">
                                    <h4 class="results-title">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                        El Resultado
                                    </h4>
                                    <div class="results-grid">
                                        <div class="result-item"><div class="result-check">✔</div><p>Imagen mucho más profesional</p></div>
                                        <div class="result-item"><div class="result-check">✔</div><p>Simulador de auditoría personalizado</p></div>
                                        <div class="result-item"><div class="result-check">✔</div><p>Webinars actualizados automáticamente</p></div>
                                        <div class="result-item"><div class="result-check">✔</div><p>Diseño optimizado para computadoras y dispositivos móviles</p></div>
                                    </div>
                                </div>
                            </div>

                            <div class="project-gallery">
                                <h4 class="gallery-title">Galería del Proyecto</h4>
                                <div class="gallery-grid">
                                    <div class="gallery-item placeholder-item"><div class="placeholder-content"><span>Próximamente</span></div></div>
                                    <div class="gallery-item placeholder-item"><div class="placeholder-content"><span>Próximamente</span></div></div>
                                    <div class="gallery-item placeholder-item"><div class="placeholder-content"><span>Próximamente</span></div></div>
                                </div>
                            </div>
                        </div>
                    </div> <!-- End project-card -->

                    <div class="project-gifs">
                        <img src="assets/gif-web-1.gif" alt="GIF" class="raw-gif">
                        <img src="assets/gif-web-2.gif" alt="GIF" class="raw-gif">
                        <img src="assets/gif-web-3.gif" alt="GIF" class="raw-gif">
                    </div>
                </div> <!-- End project-layout-split -->
            </div> <!-- End panel-web -->

            <!-- ===== TAB: Software Adaptado ===== -->
            <div class="project-panel" id="panel-software">
                <div class="project-layout-split animate-on-scroll fade-up">
                    <div class="project-card">
                        <div class="project-hook">
                            <div class="hook-badge">Mis Proyectos</div>
                            <h3 class="hook-title">Sistema de gestión para estacionamiento</h3>
                        </div>

                        <div class="project-body project-body-single">
                            <div class="project-info">
                                <div class="project-dual">
                                    <div class="dual-card challenge">
                                        <h4>El Reto</h4>
                                        <p>El estacionamiento registraba manualmente el ingreso y salida de vehículos, lo que ocasionaba pérdida de información y dificultaba el control de los ingresos.</p>
                                    </div>
                                    <div class="dual-card solution">
                                        <h4>La Solución</h4>
                                        <p>Desarrollé una aplicación personalizada para digitalizar todo el proceso de atención, desde el registro de vehículos hasta el control de pagos y reportes.</p>
                                    </div>
                                </div>

                                <div class="project-results">
                                    <h4 class="results-title">El Resultado</h4>
                                    <div class="results-grid">
                                        <div class="result-item"><div class="result-check">✔</div><p>Registro digital de vehículos</p></div>
                                        <div class="result-item"><div class="result-check">✔</div><p>Tickets automáticos</p></div>
                                        <div class="result-item"><div class="result-check">✔</div><p>Control de ingresos en tiempo real</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <!-- End project-card -->
                    <div class="project-gifs">
                        <!-- Placeholders for software GIFs, the user can add them later or we leave empty for now, but we add the structure -->
                        <div class="gallery-item placeholder-item" style="height:200px;"><div class="placeholder-content"><span>Próximamente</span></div></div>
                    </div>
                </div> <!-- End project-layout-split -->
            </div> <!-- End panel-software -->

            <!-- ===== TAB: Plataformas Digitales ===== -->
            <div class="project-panel" id="panel-platforms">
                <div class="project-layout-split animate-on-scroll fade-up">
                    <div class="project-card">
                        <div class="project-hook">
                            <div class="hook-badge">Mis Proyectos</div>
                            <h3 class="hook-title">Plataforma de gestión para consultoras</h3>
                        </div>

                        <div class="project-body project-body-single">
                            <div class="project-info">
                                <div class="project-dual">
                                    <div class="dual-card challenge">
                                        <h4>El Reto</h4>
                                        <p>La empresa gestionaba múltiples proyectos y consultores desde diferentes ubicaciones, lo que dificultaba conocer el avance real de cada servicio y centralizar toda la información.</p>
                                    </div>
                                    <div class="dual-card solution">
                                        <h4>La Solución</h4>
                                        <p>Desarrollé una plataforma web totalmente personalizada para gestionar clientes, proyectos, consultores y el seguimiento de cada servicio desde un solo lugar y accesible desde cualquier dispositivo.</p>
                                    </div>
                                </div>

                                <div class="project-results">
                                    <h4 class="results-title">El Resultado</h4>
                                    <div class="results-grid">
                                        <div class="result-item"><div class="result-check">✔</div><p>Control centralizado de todos los proyectos</p></div>
                                        <div class="result-item"><div class="result-check">✔</div><p>Seguimiento en tiempo real</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <!-- End project-card -->
                    <div class="project-gifs">
                         <div class="gallery-item placeholder-item" style="height:200px;"><div class="placeholder-content"><span>Próximamente</span></div></div>
                    </div>
                </div> <!-- End project-layout-split -->
            </div> <!-- End panel-platforms -->
        </div>
    </section>
'''

new_html = html[:match.start(1)] + panels_html + match.group(2) + html[match.end(2):]

# Fix Contact Section layout
# Currently: 
# <div class="contact-grid">
#   <div class="contact-cards ...">...</div>
#   <div class="contact-cta ...">...</div>
# </div>
# <div class="contact-form-wrapper ...">...</div>
# We want:
# <div class="contact-grid">
#   <div class="contact-left">
#       <div class="contact-cards ...">...</div>
#       <div class="contact-cta ...">...</div>
#   </div>
#   <div class="contact-form-wrapper ...">...</div>
# </div>

# We will use regex to find contact-grid and wrap left items
contact_pattern = r'(<div class="contact-grid">)(\s*<!-- Contact Cards -->\s*<div class="contact-cards animate-on-scroll fade-up">.*?</div>\s*<!-- Contact CTA -->\s*<div class="contact-cta animate-on-scroll fade-up">.*?</div>)(\s*</div>\s*<!-- Contact Form -->\s*<div class="contact-form-wrapper animate-on-scroll fade-up".*?>.*?</div>\s*</section>)'

def repl_contact(m):
    part1 = m.group(1) # <div class="contact-grid">
    part2 = m.group(2) # cards and cta
    part3 = m.group(3) # </div> form </section>
    
    # Strip the </div> that closes contact-grid from part3, and put form inside it
    part3 = re.sub(r'^\s*</div>\s*<!-- Contact Form -->', '<!-- Contact Form -->', part3)
    # The form now belongs inside the grid, so we just add the closing </div> before </section>
    part3 = re.sub(r'</section>', '</div>\\n    </section>', part3)
    
    return part1 + '\\n<div class="contact-left-col">' + part2 + '\\n</div>\\n' + part3

new_html = re.sub(contact_pattern, repl_contact, new_html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

# Adjust CSS for layout to match sketch (75% / 25%)
css = ''
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

split_old = '''/* Layout Split */
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

split_new = '''/* Layout Split */
.project-layout-split {
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

css = css.replace(split_old, split_new)

# Add CSS for .contact-left-col
css += '''
.contact-left-col {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}
'''

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

