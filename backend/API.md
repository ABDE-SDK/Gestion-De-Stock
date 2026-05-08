# API - http://localhost:3001

**Auth Header:** `Authorization: Bearer <token>`

## Auth

| Route | Méthode | Body | Response |
|-------|---------|------|----------|
| `/register` | POST | `{username, email, password, name}` | 201 - User created |
| `/login` | POST | `{email, password}` | 200 - `{token, user}` |
| `/me` | GET | - | 200 - `{user}` |

## Fournisseurs

| Route | Méthode | Query/Body |
|-------|---------|------------|
| `/suppliers` | GET | `?user_id=` (optional) |
| `/suppliers/:id` | GET | - |
| `/suppliers` | POST | `{name, phone, email, city, category, user_id}` |
| `/suppliers/:id` | PUT | `{name, phone, email, city, category, user_id}` |
| `/suppliers/:id` | DELETE | - |

## Produits

| Route | Méthode | Query/Body |
|-------|---------|------------|
| `/products` | GET | `?user_id=` (optional) |
| `/products/:id` | GET | - |
| `/products` | POST | `{name, description, quantity, price, category, barcode, min_stock, user_id, supplier_id}` |
| `/products/:id` | PUT | `{name, description, quantity, price, category, barcode, min_stock, user_id, supplier_id}` |
| `/products/:id` | DELETE | - |

## Codes: 400, 401, 404, 500
