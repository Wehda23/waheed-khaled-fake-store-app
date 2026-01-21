# Bosta Frontend Assessment by (Waheed Khaled)

A modern frontend application built with **Next.js (App Router)** that consumes the **Fake Store API** to display, filter, sort, paginate, and create products.

This project was built as a technical task to demonstrate **frontend architecture, state management, API abstraction, validation, and UI/UX practices**.

---

## 🚀 Live Demo

👉 **Live Application:**
[ADD NETLIFY / VERCEL LINK HERE]

---

## 🧠 Key Features

### Products
- Fetch and display products from Fake Store API
- Client-side:
  - Search (debounced)
  - Sorting (price / category, asc / desc)
  - Pagination (configurable page size)
- Skeleton loaders for better UX
- Graceful empty states

### Create Product
- Product creation form
- Validation using **Zod + React Hook Form**
- Clear error messages
- Success & error feedback via **react-toastify**
- Redirects to product details page after creation

### Product Details
- Dedicated product page (`/[id]`)
- Responsive layout (Shopify-style)
- SEO metadata via Next.js `generateMetadata`

---

## 🏗️ Architecture & Design Decisions

### 1️⃣ API Layer (Proxy Pattern)
The API layer is intentionally **abstracted and layered**:

```

Axios / Fetch
↓
Throttle Proxy
↓
Auth & Error Proxy
↓
Domain API (FakeStoreApi)

````

This allows:
- Easy switching between Axios and Fetch
- Optional throttling (`skipThrottle`)
- Centralized auth headers & error handling
- Reusability for other backends (CRM, Inventory, etc.)

Example:
```ts
api.login("username", "password", { skipThrottle: true });
````

---

### 2️⃣ State Management

* **Redux Toolkit** for global product state
* Memoized selectors for derived data (search, sort, pagination)
* Clear separation between:

  * Server state (fetched products)
  * UI state (filters, page, sort)

---

### 3️⃣ Validation Strategy

* **Zod** used as the single source of truth
* Browser input → coerced → validated → domain-safe values
* Friendly error messages for users

---

### 4️⃣ Performance & UX

* Debounced search input
* Skeleton loaders instead of spinners
* Throttled API calls to avoid spamming
* React Strict Mode handled safely (no duplicate fetch bugs)

---

## 📁 Project Structure (Simplified)

```
src/
├─ app/
│  ├─ page.tsx                # Products page
│  ├─ [id]/page.tsx           # Product details
│  └─ create-product/
│     └─ components/
│        └─ CreateProductForm.tsx
│
├─ components/
│  ├─ product-card/
│  ├─ products/
│  └─ layout/
│
├─ lib/
│  ├─ api/                    # FakeStoreApi + entry point
│  ├─ http/                   # Axios, proxies, throttle
│  ├─ store/                  # Redux slices & selectors
│  └─ validation/             # Zod schemas
│
├─ hooks/
│  └─ useDebounce.ts
│
└─ types/
   └─ product.types.ts
```

---

## ⚠️ Known Limitations

* Authentication is **not fully implemented**

  * Fake Store API login exists, but full auth flow (guards, cookies) is intentionally left incomplete
* Cart functionality is **not implemented**
* All filtering, sorting, and pagination are **client-side** due to API limitations

These areas were intentionally scoped out to focus on **architecture quality and correctness**.

---

## 🛠️ Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Redux Toolkit**
* **React Hook Form**
* **Zod**
* **Axios**
* **Tailwind CSS**
* **React Toastify**

---

## ▶️ Running Locally

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🔮 Possible Improvements (Future Work)

* Full authentication flow (cookies + guards)
* Cart & checkout
* Server-side filtering/pagination
* Caching / stale-time strategy
* Tests (unit + integration)
* Dark mode

---

## 👋 Notes for Reviewers

* Fake Store API is a **demo backend** and may behave inconsistently
* Focus of this project is **frontend engineering quality**, not feature completeness
* Architecture is designed to scale beyond this demo

Thank you for reviewing this submission 🙌