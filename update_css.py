# -*- coding: utf-8 -*-
import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace .project-tabs and .tab-btn with .service-cards-grid and .service-card
tabs_css = '''/* Project Tabs */
.project-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.tab-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    font-size: var(--fs-small);
    font-weight: 500;
    color: var(--gray-700);
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    transition: all var(--transition-medium);
    white-space: nowrap;
}

.tab-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
}

.tab-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.tab-btn.active {
    background: var(--black);
    color: var(--white);
    border-color: var(--black);
    box-shadow: var(--shadow-md);
}

.tab-btn.active svg {
    stroke: var(--primary-light);
}'''

cards_css = '''/* Service Cards Grid (New Tabs) */
.service-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
}

.service-card {
    display: flex;
    align-items: stretch;
    background: var(--white);
    border-radius: var(--radius-lg);
    border: 1px solid var(--gray-200);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-medium);
    box-shadow: var(--shadow-sm);
}

.service-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
}

.service-card.active {
    border-color: var(--black);
    box-shadow: 0 0 0 2px var(--black);
}

.service-card-image {
    width: 40%;
    background: var(--gray-200);
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid var(--gray-200);
}

.service-card-image span {
    font-size: var(--fs-xs);
    color: var(--gray-500);
    font-weight: 600;
}

.service-card-content {
    width: 60%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.service-card-content svg {
    width: 24px;
    height: 24px;
    stroke: var(--primary);
    margin-bottom: 0.75rem;
}

.service-card-content h3 {
    font-size: var(--fs-body);
    font-weight: 700;
    color: var(--black);
    margin-bottom: 0.25rem;
}

.service-card-content p {
    font-size: var(--fs-xs);
    color: var(--gray-500);
    line-height: 1.4;
}'''

css = css.replace(tabs_css, cards_css)

# Add .project-layout-split and .raw-gif right before /* Project Card */
split_css = '''/* Layout Split */
.project-layout-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
}

.project-gifs {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.raw-gif {
    width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--gray-200);
    display: block;
}

/* Project Card */'''

css = css.replace('/* Project Card */', split_css)

# Adjust .project-body for single column since GIFs moved out
body_css = '''.project-body-single {
    display: flex;
    flex-direction: column;
    grid-template-columns: none !important;
}'''

css = css.replace('/* GIF Preview Column */', body_css + '\\n\\n/* GIF Preview Column */')


# Responsive fixes
media_query_tablet = '''/* Tablet */
@media (max-width: 992px) {
    .service-cards-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    .project-layout-split {
        grid-template-columns: 1fr;
    }'''

css = css.replace('/* Tablet */\\n@media (max-width: 992px) {', media_query_tablet)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

