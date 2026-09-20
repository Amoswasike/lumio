# Lumio Finance Public Website

A standalone vanilla HTML, CSS, and JavaScript marketing website for **Lumio Finance**.

The website is the public-facing product and marketing layer for Lumio Finance. It provides product information, feature education, conversion-focused content, legal pages, contact information, and SEO infrastructure.

The authenticated Lumio Finance application remains a separate project.

---

## Architecture

Lumio Finance is intentionally divided into two independent projects.

### Public Website

The public website is responsible for:

- Product marketing
- Product education
- Feature presentation
- Frequently asked questions
- Security and data-practice information
- Contact
- Privacy and terms pages
- SEO and search-engine metadata
- Conversion-focused calls to action

### Lumio Finance Application

The authenticated application is responsible for:

- Authentication
- Routing
- Application state
- Financial data management
- Transactions
- Budgets
- Goals
- Bills
- Analytics
- Notifications
- Profile and settings
- Theme management

The application is not merged into this website's JavaScript module structure.

---

## Project Structure

```text
lumio-finance-website/
│
├── index.html
├── features.html
├── how-it-works.html
├── security.html
├── faq.html
├── contact.html
├── privacy.html
├── terms.html
├── 404.html
│
├── assets/
│   ├── brand/
│   │   └── logos/
│   ├── screenshots/
│   ├── illustrations/
│   └── icons/
│
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── pages.css
│   └── main.css
│
├── js/
│   ├── site.js
│   ├── navigation.js
│   ├── faq.js
│   └── analytics.js
│
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── README.md
