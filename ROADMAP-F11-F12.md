# 🗺️ Roadmap F11 + F12 — Producción & Payments

> Estado verificado contra el código el **2026-06-20**.
> Este repo (`product-app`) es **solo el frontend (Next.js 16)**.
> El backend (Express + MongoDB) vive en **otro repo** → las tareas de backend están marcadas con 🟦 **[BACKEND]** y se trackean ahí.

**Leyenda:** `[x]` hecho y verificado · `[~]` parcial · `[ ]` pendiente

---

## 🔒 F11.1 — Seguridad base (obligatoria)
> Objetivo: blindar API y preparar producción. **Hacer ANTES que cualquier analytics/SEO.**

### 🟦 [BACKEND]
- [ ] `helmet`
- [ ] `express-rate-limit`
- [ ] CORS producción exacto (origin whitelist, no `*`)
- [ ] Sanitización básica (input / NoSQL injection)
- [ ] Env validation fuerte (zod/envalid al boot)
- [ ] Mejorar errores de auth (mensajes consistentes, no filtrar info)

### Frontend (este repo)
- [x] Interceptor 401 → limpia token/user + redirect a `/login` (`src/lib/api/client.ts`)
- [ ] Validación de env en frontend (`NEXT_PUBLIC_API_URL` se usa directo sin validar)
- [ ] Revisar que el token no quede en `localStorage` sin necesidad (hoy se mezcla store + localStorage)

---

## 🛍️ F11.2 — Catálogo serio
> Objetivo: escalar catálogo y UX de búsqueda. **Prioridad inmediata junto con F11.1.**

### 🟦 [BACKEND]
- [ ] Búsqueda (texto)
- [ ] Filtros (categoría, marca, precio, stock)
- [ ] Paginación (limit/offset o cursor)
- [ ] Sorting (precio, fecha, rate)
- [ ] Índices MongoDB

### Frontend (este repo)
- [ ] Barra de búsqueda
- [ ] Filtros UI
- [ ] Paginación UI
- [~] Empty states — existe uno básico en `products-grid.tsx`, mejorar (sin resultados vs sin productos)
- [ ] Adaptar `get-products.ts` + `use-products.ts` para pasar query params (hoy hace `GET /products` pelado, sin params)

---

## ☁️ F11.3 — Imágenes reales
> Objetivo: uploads reales y optimización. Hoy las imágenes son **URLs pegadas a mano** (`z.string().url()` en el schema).

### 🟦 [BACKEND]
- [ ] Integrar Cloudinary o S3
- [ ] Endpoint de upload / firma de subida
- [ ] Delete / reemplazo en el storage

### Frontend (este repo)
- [ ] Upload desde el frontend (reemplazar campo URL por file input)
- [ ] Preview de imágenes antes de subir
- [ ] Delete / reemplazo desde la UI
- [ ] Optimización: migrar `<img>` → `next/image` (hoy `product-card.tsx` usa `<img>` plano)
- [~] Fallback image — existe `onError` → `/placeholder.png` **PERO el archivo NO existe** en `public/` (solo hay `.svg`). ⚠️ Bug: agregar `public/placeholder.png`
- [ ] Configurar `images.remotePatterns` en `next.config.ts` (hoy no está configurado)
- [ ] **Bonus:** blur placeholders
- [ ] **Bonus:** lazy loading (gratis con `next/image`)

---

## 📦 F11.4 — Operación de ecommerce
> Objetivo: automatizar el flujo de negocio ("producto vivo").

### 🟦 [BACKEND]
- [ ] Emails de order status: `paid`, `shipped`, `delivered`, `cancelled`
- [ ] Emails register/login (opcional)
- [ ] Webhooks básicos
- [ ] Logs centralizados
- [ ] Backups DB

### Frontend (este repo)
- [x] Stock visual — `product-card.tsx` muestra "⚠️ ¡Últimas unidades!" cuando `quantity <= 10`
- [ ] UI de estados de orden conectada a los emails/estados reales (ya existe `OrderStatusBadge`, validar cobertura de estados)

---

## 📊 F11.5 — Observabilidad & Analytics
> Objetivo: entender uso y errores. **Tiene sentido cuando ya hay tráfico.**

### 🟦 [BACKEND]
- [ ] Request metrics
- [ ] Error monitoring (Sentry)

### Frontend (este repo)
- [ ] Analytics básicos
- [ ] Page tracking
- [ ] Error monitoring (Sentry / PostHog)
- [ ] Dashboards simples
- [ ] **Opcionales:** Sentry · PostHog · Better Stack

---

## 🌐 F11.6 — SEO & venta
> Objetivo: que Google entienda los productos. Útil cuando el catálogo ya está estable.

### Frontend (este repo) — todo pendiente
- [ ] Metadata dinámica (hoy `layout.tsx` **no** exporta `metadata`; las páginas de producto tampoco)
- [ ] Open Graph
- [ ] Twitter cards
- [ ] JSON-LD `Product` schema
- [ ] `sitemap.ts` / `sitemap.xml`
- [ ] `robots.txt`
- [ ] Performance de imágenes (depende de F11.3 → `next/image`)
- [ ] SEO técnico básico (titles, canonical, lang ya está en `<html lang="es">` ✅)

---

## 🔐 F11.7 — Auth avanzada (opcional)
> Objetivo: mejorar sesión y seguridad. "Nivel producción fuerte."

### 🟦 [BACKEND]
- [ ] Refresh tokens
- [ ] Rotation
- [ ] Revoke sessions
- [ ] Device tracking (opcional)
- [ ] Email verification
- [ ] Forgot password

### Frontend (este repo)
- [ ] Flujo de refresh token en el interceptor (hoy es JWT directo, sin refresh)
- [ ] Pantallas: verificar email, forgot/reset password
- [ ] Gestión de sesiones activas (UI)

---

## 💳 F12 — Payments Infrastructure

### 🟦 [BACKEND]
- [ ] Mercado Pago Checkout Pro
- [ ] Webhooks seguros (firma/validación)
- [ ] Payment entity/model
- [ ] Idempotencia
- [ ] Payment logs
- [ ] Retry handling
- [ ] Estados de pago
- [ ] Emails automáticos
- [ ] Refunds básicos
- [ ] Stripe integration
- [ ] Provider abstraction (interfaz común MP/Stripe)
- [ ] Crypto provider (opcional)
- [ ] Sandbox testing
- [ ] Ngrok / webhook dev local

### Frontend (este repo)
- [ ] Botón / flujo de checkout (redirect a MP/Stripe)
- [ ] Páginas de retorno: success / failure / pending
- [ ] Estado de pago en la orden (UI)

---

## 🧠 Orden recomendado de ejecución

| Prioridad | Fases | Por qué |
|-----------|-------|---------|
| 🚀 Inmediata | **F11.1** Seguridad → **F11.2** Catálogo | Estabilidad, UX, escalabilidad |
| 🚀 Después | **F11.3** Imágenes → **F11.4** Operación | Percepción de "empresa real" |
| 🚀 Más adelante | **F11.5** Analytics → **F11.6** SEO → **F11.7** Auth avanzada | Sirven con tráfico real |
| 💳 Cuando el core esté firme | **F12** Payments | Negocio de verdad |

---

## ✅ Roadmap general (contexto)

| Fase | Estado |
|------|--------|
| F1–F7 Backend core | ✅ |
| F8 Frontend MVP | ✅ |
| F9 Flujo usable ecommerce | ✅ |
| F10 Testing + calidad | ✅ |
| **F11 Negocio serio / producción** | 🚧 (este doc) |
| **F12 Payments** | 🚧 (este doc) |

---

### 🔧 Quick wins detectados (se pueden hacer ya, sueltos)
- [x] Agregar `public/placeholder.png` (600×400, el fallback de `product-card.tsx` ya resuelve)
- [x] Exportar `metadata` base en `src/app/layout.tsx` (title + template + description)
- [x] Configurar `images.remotePatterns` en `next.config.ts` (listo para migrar a `next/image`)
