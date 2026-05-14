# AusGSTPro (Next.js)

AusGSTPro is a modern, responsive Australian GST calculator built with Next.js (App Router), React, TypeScript, and custom CSS.

The project includes:
- Interactive GST calculator (add/remove GST)
- FAQ accordion
- Contact form with client-side validation
- Legal pages (Privacy, Terms, Disclaimer, About, Affiliate Disclosure)
- SEO essentials (`robots.txt`, `sitemap.xml`, metadata, FAQ schema)

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- CSS (global + component class-based styling)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3) Build for production

```bash
npm run build
```

### 4) Start production server

```bash
npm run start
```

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run start` - run production build
- `npm run lint` - run Next.js lint checks

## Project Structure

```text
app/
  components/
    effects/
      ScrollEffects.tsx
    forms/
      ContactForm.tsx
    home/
      CalculatorSection.tsx
      Faq.tsx
    layout/
      Footer.tsx
      Header.tsx
  data/
    faq.ts
    navigation.ts
  about-us/
    page.tsx
  affiliate-disclosure/
    page.tsx
  contact/
    page.tsx
  disclaimer/
    page.tsx
  privacy/
    page.tsx
  terms/
    page.tsx
  globals.css
  icon.svg
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
style.css
```

## SEO and Routing Notes

- Global metadata is defined in `app/layout.tsx`.
- FAQ structured data (JSON-LD) is injected on the homepage in `app/page.tsx`.
- `app/robots.ts` and `app/sitemap.ts` generate SEO routes.

## Design and Responsiveness

- Theme is a light, premium calculator-style UI.
- Header is fixed/sticky behavior with responsive navigation.
- Dedicated responsive tuning for mobile, tablet, and desktop breakpoints.

## Legacy Static Files

Older static HTML/CSS/JS versions are kept in `legacy-static/` for reference/migration history.

## License

Private project. Update this section if you want to publish under an open-source license.
