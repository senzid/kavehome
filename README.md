# Kave Home demo project

Frontend demo made by Joan de Sardi. Built with **Next.js v16** (App Router), **React**, **TypeScript**, and **Tailwind CSS**.

**Live:** hosted on Vercel at [kavehome.vercel.app](https://kavehome.vercel.app/).

**COPYRIGHT Disclaimer:** any data, image and design is property of [Kave Home](https://kavehome.com) (©2026 Kave Home)

**SEO Disclaimer:** it's a demo site: pages are set to `noindex` so they are not crawled by search engines. Due this SEO puntuation on lighthouse are low. But if I remove the `noindex` the score raises to 100%.

---

## How to run

**Requirements:** Node.js 20+ and npm.

**Repository:** [https://github.com/senzid/kavehome](https://github.com/senzid/kavehome)

```bash
# 1. Clone the project
git clone https://github.com/senzid/kavehome.git
or
git clone git@github.com:senzid/kavehome.git #SSH

# 2. Install dependencies
cd kavehome
npm install

# 3. Configure environment
cp .env.example .env # make a copy of the .env.example file
# API_BASE_URL = Kave Home public API base URL
# NEXT_PUBLIC_SITE_URL = Absolute site URL. Use `http://localhost:3000` locally
# For any doubts of correct values, ask to @senzid.

# 4. Development
npm run dev
# → http://localhost:3000

# 5. Production build
npm run build
npm start

# 6. Quality checks
npm run lint
npm test
# or both:
npm run verify
```

---

## Architecture

### Project Structure
This project is built on a "light version" of modular by domain architecture. Also use screaming architecture for folder structure and applies basic concepts of hexagonal architecture to easily scale to it if it's necessary. It means that we have a modules folder that contains all the logic (domain layer) and more folders that are structured to support our business logic. 

The main idea: Routes stay simple. Business logic and data fetching live in **modules**, so features can change without touching the routing layer.

The folder structure is as follows:

#### app
Contains only routes (pages) files, but they contain no logic, only composition. Only renders components from features or components folder.

#### components
Contains "dummy" components. This folder contains the components that I want to reuse, but they do not contain business logic. For example, components like Buttons, Header, etc. There are two folders, `ui` for basic components and `layout` for structural components.

#### data
JSON data for this test. In this case static JSON fallbacks for api responses.

#### modules
This is the domain layer. The most important part of our application as it contains the business logic and the methods for implementing it. Each specific feature has its own directory and it contains all the components or functions to manage itself.

#### lib
Contains generic functions, like data fetching methods or seo logic. It's the infraestructure layer.

### Data fetching

- All api calls are GETs made through a single helper: `src/lib/api.ts` (`apiGet`).
- Product, category, and blog data is fetched on the server with **ISR** (`revalidate` ≈ 24h) and cache tags. This pattern allow to implement any system to break the cached data (for example a webhook or any specific action).
- Product detail are SSR for now, but the good direction is the same pattern as products pages (ISR the top 100/200/ and the other SSR)
- If the live API fails or returns an error, modules fall back to snapshots under `src/data/endpoints-response/`. For now, **this implementation was done intentionally due to the API's 429 error.** In any case, a fallback of this kind is a best practice.

### Server vs client

- **Server Components** by default (home, catalog, PDP, blog). They are the primary choice
- **Client Components** only where interactivity is required (favorites, hero video controls, carousels).

### State Management
- Favorites are scoped under the `(shop)` route group via `FavoritesProvider` (react context), persisted in `localStorage` (no backend).
- Only the Products needs this context, so the provider wraps only those pages.
- There are 2 context, the state and the methods. This is because I want to avoid unnecesary re-renders and a component could need only state or only a method.

### Product domain

- API responses are mapped into app-friendly types (`productMappers`) before UI use. Raw API responses are never used directly in pages or components.
- List pagination and PDP lookups share the same module (`src/modules/products`).
- React `cache()` deduplicates fetches within a single request. For example, if products are required two times with the same arguments, the second response is served from cache.

### UI

- Shared presentation primitives in `src/components/ui`.
- Shared structural components in `src/components/layout` like headers. For example, if we want to add a footer, this would be its directory.
- There are some design tokens shared via CSS variables, following Tailwind patterns.

### SEO
- Metadata helpers in `src/lib/seo.ts` (canonical URLs, Open Graph, robots). As it is a test, all pages are set to `noindex` to avoid problems with kavehome SEO.

### Testing

- Unit tests with **Vitest** next to the code they cover (mappers, pagination, API helper, favorites storage, currency formatting).

## AI Usage
- To refine some conditional cases. For example, in pagination, to be sure that any case escapes my notice.
- To refactor some components. For example, adding `index.ts` barrel exports to modules, because at the beginning I wasn't using them.
- To generate types, mainly for API responses.
- To define the test strategy. I decided to cover around 20 functions and generate the tests with AI, then reviewed them because it produced some duplicate test cases.
- To look up best practices for the Web Video API controls, as I hadn't used them in a long time — especially not in a hero section.
- To create, skeletons or 2 svg icons. I create with AI and only review it.
- And, of course, the "tab" usage to autocomplete the code generation.