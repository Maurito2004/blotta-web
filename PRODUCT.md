# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML + CSS + vanilla JS, no build step (must open by double-clicking `index.html`). One `styles.css`, one `main.js`. Google Fonts (Montserrat, Barlow Condensed). Decided by the user in the brief.

## Users

Primary: industrial food manufacturers and exporters (Argentina and abroad) who compare production machinery and request quotes. Secondary: gastronomic franchises and mid-size rotiserías moving from manual to industrial production without losing recipe quality and texture. Confirmed by the user: factories/exporters are the priority audience.

## Product Purpose

Demo website ("Blotta Global Digital", final project of a Fundación Empujar course) for Blotta – Tecnología Alimentaria, Rosario. Lets companies worldwide discover the machines, see how they work, describe their needs and request personalized quotes. Replaces an old site with dated UI, confusing menu, no clear catalog and no contact channels. Success = a visitor finds the right machine and sends a quote request.

## Positioning

Rosario manufacturer founded 1995 by inventor Claudio Blotta; 30+ years designing and building empanada and dough production machinery. B2B only, never sells to end consumers.

## Capabilities and Constraints

- Demo, no backend: forms, chatbot and order status are simulated in JS (TODO hooks for Formspree/EmailJS/backend).
- Language: Spanish only (rioplatense, professional; vos in CTAs). Confirmed by user.
- WhatsApp number still undecided: kept as a constant placeholder.
- Pages: index (long single page), foro.html (mock forum), trabaja-con-nosotros.html (3 job openings, CV via mailto blottaindustriasrrhh@gmail.com).

## Brand Commitments

Binding palette and type from the brand manual: #123FB3 primary blue, #EE9E26 orange, #FEBB56 pale orange, #FCEADB cream background, #0B3F7A navy headings, #1B1E4B body text, #939393 neutral gray. Montserrat 700/800 headings, Barlow Condensed body. Organic blue/orange blobs with a thin wavy orange line, short orange bar under headings, pill buttons, white rounded cards. Logos in `assets/` are used as-is, never stretched or recolored.

## Evidence on Hand

- `assets/logo-blotta.jpg` (1043×294, cream background), `assets/logo-empujar.png` (transparent).
- No real photos yet (to be added progressively by the user). No real machine specs: all technical data is marked "dato de ejemplo".
- Must NOT publish: revenue projections, internal budgets, staff data. No invented testimonials or clients.

## Product Principles

1. Every path ends at a quote request: catalog → details → "Cotizar" pre-fills the form.
2. Clarity over decoration: the old site failed on navigation and catalog clarity.
3. Honest demo: placeholder data is labeled as such.
4. Easy for a student team to edit: data in JS arrays, comments in Spanish.

## Accessibility & Inclusion

Basic WCAG AA: semantic HTML, alt text, AA contrast, keyboard navigation, aria-labels on icon buttons, prefers-reduced-motion respected.
