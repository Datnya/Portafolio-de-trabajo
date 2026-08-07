import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Fix the logo path
html = html.replace('assets/client-logo.png', 'assets/apm-logo.svg')

# 2. Add Trusted By section before Footer
carousel_html = '''
    <!-- ======================== TRUSTED BY SECTION ======================== -->
    <section class="trusted-by" id="clientes">
        <div class="container">
            <div class="trusted-header animate-on-scroll fade-up">
                <p class="trusted-subtitle">Empresas que confían en mi trabajo</p>
            </div>
            
            <div class="carousel-container animate-on-scroll fade-up">
                <div class="carousel-track">
                    <!-- Original logos -->
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                    
                    <!-- Duplicated logos for infinite scroll effect -->
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                    <div class="carousel-slide">
                        <img src="assets/apm-logo.svg" alt="APM Group" class="carousel-logo">
                    </div>
                </div>
            </div>
        </div>
    </section>

'''
# Insert before Footer
html = html.replace('    <!-- ======================== FOOTER ======================== -->', carousel_html + '    <!-- ======================== FOOTER ======================== -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 3. Add CSS for carousel and adjust contact form
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Adjust contact form (move up)
css = css.replace('.contact-form-wrapper {\\n    margin-top: 0;\\n    background: var(--white);', '.contact-form-wrapper {\\n    margin-top: -2rem;\\n    background: var(--white);')

# Add Carousel CSS
carousel_css = '''
/* ================================================
   TRUSTED BY CAROUSEL
   ================================================ */
.trusted-by {
    padding: 4rem 0;
    background: var(--white);
    border-top: 1px solid var(--gray-200);
}

.trusted-header {
    text-align: center;
    margin-bottom: 3rem;
}

.trusted-subtitle {
    font-size: var(--fs-h4);
    font-weight: 700;
    color: var(--black);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.carousel-container {
    overflow: hidden;
    width: 100%;
    position: relative;
    padding: 1rem 0;
}

/* Fading edges for the carousel */
.carousel-container::before,
.carousel-container::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
}

.carousel-container::before {
    left: 0;
    background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
}

.carousel-container::after {
    right: 0;
    background: linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
}

.carousel-track {
    display: flex;
    width: calc(200px * 10); /* 10 slides */
    animation: scroll 20s linear infinite;
    align-items: center;
}

.carousel-track:hover {
    animation-play-state: paused;
}

.carousel-slide {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
}

.carousel-logo {
    max-width: 100%;
    height: 60px;
    object-fit: contain;
    filter: grayscale(100%) opacity(60%);
    transition: all 0.3s ease;
}

.carousel-logo:hover {
    filter: grayscale(0%) opacity(100%);
}

@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-200px * 5)); }
}

@media (max-width: 768px) {
    .contact-form-wrapper {
        margin-top: 0;
    }
}
'''
css += carousel_css

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

