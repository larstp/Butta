# JS Frameworks 2025 + POR2 2026 - Butta

## Project Documentation: Butta Online Shop

<p align="center">
  <img src="src/assets/Butta-logo-transparent.png" alt="Butta logo" width="420" />
</p>

Originally cloned from old GitHub Classroom Repo:
https://github.com/NoroffFEU/jsfw-2025-v1-larstp-jsf

### Contents:

<details>
  <summary>Table of Contents</summary>

[1. Project Overview](#1-project-overview)

- [Project Links](#project-links)

  [Assignment Specifics](#assignment-specifics)

  [2. Setup and Installation](#2-setup-and-installation)

  [3. Scripts](#3-scripts)

  [4. Technologies Used](#4-technologies-used)

  [5. Folder Structure](#5-folder-structure)

  [6. Features](#6-features)

  [7. API Usage](#7-api-usage)

  [8. Deployment (Vercel)](#8-deployment-vercel)

  [9. Accessibility and UX](#9-accessibility-and-ux)

  [10. Known Issues and Limitations](#10-known-issues-and-limitations)

  [11. Credits](#11-credits)

  [12. Contact](#12-contact)

</details>

---

## 1. Project Overview

Butta is a responsive e-commerce front-end built with React, TypeScript, and Vite. It fetches products from the Noroff Online Shop API and lets users browse products, search and sort items, view product details, manage a cart, and complete a mock checkout flow.

The project was originally created as a short introductory assignment for the JS Frameworks course, focused on learning the fundamentals of React, TypeScript, API integration, routing, and state management. It has since been refurbished for the POR2 assignment with visual, accessibility, performance, and maintainability improvements.

### Project Links

- Course repository: https://github.com/NoroffFEU/jsfw-2025-v1-larstp-jsf
- Current project repository: https://github.com/larstp/Butta
- Live Site (Vercel): https://butta.larstp.com

### Assignment Specifics

#### JS Frameworks

Butta was originally created as the main project for the JS Frameworks course assignment at Noroff. The goal was to build a fully functional, responsive online shop using React, TypeScript, and a REST API.

The assignment focused on applying framework and software architecture principles in a real-world digital solution. The implementation includes:

- Product fetching from the Noroff Online Shop API
- Product listings and detailed product pages
- Search and sorting functionality
- Discount and rating displays
- Typed cart state management with localStorage persistence
- Quantity updates, cart totals, and a mock checkout flow
- A validated TypeScript contact form
- Responsive layouts for desktop and mobile

#### POR2

The POR2 assignment focused on refurbishing the original JS Frameworks project and making it more presentable as part of a portfolio. This included addressing feedback from the original hand-in, improving accessibility and maintainability, refining the visual design, and fixing incomplete or inconsistent functionality.

The POR2 work builds on the original JS Frameworks assignment. The original styling is preserved in the `old-styling` branch so the visual changes can be compared with the refurbished version.

## 2. Setup and Installation

### Prerequisites

- Node.js version: 24.x
- npm

### Install and run locally

```bash
git clone https://github.com/larstp/Butta.git
cd Butta
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## 3. Scripts

- npm run dev: Start development server
- npm run build: Type-check and build production bundle
- npm run preview: Preview production build locally
- npm run lint: Run ESLint

## 4. Technologies Used

- React 19
- TypeScript
- Vite
- React Router DOM
- OGL (WebGL rendering for Grainient background)
- Tailwind CSS (utility classes)
- ESLint

### Third-party components

- Grainient background borrowed from ReactBits: https://reactbits.dev/backgrounds/grainient
- Install/reference command used for Grainient:

  npx jsrepo@latest add https://reactbits.dev/r/Grainient-JS-CSS

## 5. Folder Structure

- /src
  - /assets: Icons and brand assets
  - /components
    - /layout: Header and footer
    - /ui: Product cards, toast UI, shared pieces
  - /context: Cart and toast providers
  - /hooks: Custom hooks for context access
  - /pages: Route pages (Home, Product, Cart, Checkout, Contact)
  - /services: API request layer and product service
  - /types: Shared TypeScript types
- /public: Static files
- /docs: Project notes and docs

## 6. Features

- Product listing from Noroff Online Shop API
- Search products by title, description, or tag
- Product sorting:
  - On-sale products only
  - Price high to low
  - Price low to high
- Product detail page with:
  - Discount handling and percentage-off ribbon
  - Reviews list
  - Add to cart action
- Cart functionality:
  - Add and remove products
  - Increase and decrease quantity
  - Live subtotal and total calculation
  - Persisted cart in localStorage
- Checkout success flow (mock checkout)
- Toast notifications for cart actions
- Global animated Grainient WebGL background (borrowed from ReactBits: https://reactbits.dev/backgrounds/grainient)
- Responsive layout for mobile and desktop

## 7. API Usage

This project uses the Noroff v2 API:

- Base URL: https://v2.api.noroff.dev
- Endpoints used:
  - GET /online-shop
  - GET /online-shop/:id

Products are fetched through a typed service layer in /src/services.

## 8. Deployment (Vercel)

This project is deployed through Vercel.

SPA routing rewrite is included in vercel.json so direct route access works:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 9. Accessibility and UX

- Semantic HTML structure across pages
- Labeled interactive controls and ARIA labels on icon buttons
- Keyboard-focusable controls and visible button states
- High-contrast text and UI components on dark surfaces
- Toast feedback for key cart interactions

## 10. Known Issues and Limitations

- Checkout is a mock flow (no real payment integration)
- Product data depends on external API availability
- Cart persistence is local to the browser (localStorage)

## 11. Credits

- API: Noroff Online Shop API
- WebGL background: Grainient template borrowed from ReactBits (https://reactbits.dev/backgrounds/grainient), created by David Haz
- Icons: Project asset files and icon sets used in source assets
- Built with support from GitHub Copilot for coding assistance

## 12. Contact

- Author: [larstp](https://github.com/larstp)
- Courses: JavaScript Frameworks & POR2
- Year: 2026
