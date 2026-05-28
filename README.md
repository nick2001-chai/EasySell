# 🛒 EasySell

A full-stack e-commerce seller dashboard built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend). Designed to help small sellers manage their products, orders, inventory, and customer messages in one place.

---

## ✨ Features

| Page | Description |
|------|-------------|
| 🔐 Login / Register | JWT-based authentication with bcrypt password hashing |
| 📊 Dashboard | Key metrics, recent orders, top products, order pipeline |
| 📦 Products | Multi-step product creation form (info, images, pricing, shipping, publish) |
| 📋 Orders | Create orders, view order details, update order & payment status |
| 🏭 Inventory | Track stock levels, bulk actions, search & filter |
| 💬 Chat Inbox | Conversations UI with chat area and search |
| 🔔 Notifications | Filterable notification list with settings |

---

## 🧱 Tech Stack

### Frontend (`my-project/`)
| Tech | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| Lucide React | Icons |

### Backend (`backend/`)
| Tech | Purpose |
|------|---------|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Token (JWT) | Authentication |
| bcrypt | Password hashing |
| dotenv | Environment config |
| nodemon | Dev auto-restart |

---

## 📁 Project Structure

```
EasySell/
│
├── backend/                        # Node.js REST API
│   ├── server.js                   # Entry point
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   ├── Product.js              # Product schema
│   │   └── Order.js                # Order schema
│   ├── routes/
│   │   ├── auth.js                 # Register / Login / Profile
│   │   ├── products.js             # Product CRUD
│   │   └── orders.js               # Order CRUD + stats
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT verification
│   ├── utils/
│   │   └── generateToken.js        # JWT token generator
│   └── package.json
│
└── my-project/                     # React frontend
    ├── src/
    │   ├── app/
    │   │   ├── App.jsx             # Root component
    │   │   ├── ScreenRouter.jsx    # Route definitions
    │   │   └── main.jsx            # App entry point
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── DashBoard.jsx
    │   │   ├── Product.jsx
    │   │   ├── Order.jsx
    │   │   ├── Inventory.jsx
    │   │   ├── ChatInbox.jsx
    │   │   └── Notification.jsx
    │   ├── components/             # Reusable UI components
    │   │   ├── dashboard/
    │   │   ├── product/
    │   │   ├── order/
    │   │   ├── inventory/
    │   │   ├── chatbox/
    │   │   ├── Notification/
    │   │   └── common/
    │   └── hooks/                  # Custom React hooks
    │       ├── useDashBoard.js
    │       ├── useProductForm.js
    │       ├── useOrder.js
    │       ├── useInventory.js
    │       ├── useChat.js
    │       └── useNotification.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm or yarn

---

### 1. Clone the repository

```bash
git clone https://github.com/nick2001-chai/EasySell.git
cd EasySell
```

---

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/EasySellDB
JWT_SECRET=your_secret_key_here
```

> ⚠️ The `.env` file is not included in the repo for security reasons. You must create it yourself.

Start the backend server:

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

The API will run at: `http://localhost:5000`

---

### 3. Set up the Frontend

Open a new terminal:

```bash
cd my-project
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

## 🔌 API Endpoints

All protected routes require a `Bearer` token in the `Authorization` header.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register a new user |
| POST | `/api/auth/login` | ❌ | Login and receive JWT token |
| GET | `/api/auth/profile` | ✅ | Get current user profile |

### Products — `/api/products`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/products` | ✅ | Create a new product |
| GET | `/api/products` | ✅ | Get all products for logged-in user |
| GET | `/api/products/:id` | ✅ | Get a single product |
| PUT | `/api/products/:id` | ✅ | Update a product |
| DELETE | `/api/products/:id` | ✅ | Delete a product |

### Orders — `/api/orders`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | ✅ | Create a new order (auto-reduces stock) |
| GET | `/api/orders` | ✅ | Get all orders (filter by status/paymentStatus) |
| GET | `/api/orders/:id` | ✅ | Get a single order |
| PATCH | `/api/orders/:id/status` | ✅ | Update order status |
| PATCH | `/api/orders/:id/payment` | ✅ | Update payment status |
| DELETE | `/api/orders/:id` | ✅ | Delete an order |
| GET | `/api/orders/stats/dashboard` | ✅ | Get order statistics for dashboard |

---

## 🗄️ Database Models

### User
| Field | Type | Notes |
|-------|------|-------|
| `username` | String | Required, unique, min 3 chars |
| `email` | String | Required, unique |
| `password` | String | Hashed with bcrypt |
| `role` | String | `user` or `admin` (default: `user`) |

### Product
| Field | Type | Notes |
|-------|------|-------|
| `userId` | ObjectId | Reference to User |
| `name` | String | Required |
| `sku` | String | Unique, immutable after creation |
| `category` | String | Required |
| `description` | String | Required |
| `sellingMode` | String | `in-stock` or `pre-order` |
| `regularPrice` | Number | Required |
| `salePrice` | Number | Optional |
| `stockQuantity` | Number | Auto-decremented on order |
| `images` | [String] | Array of base64 or URLs |
| `variants` | Array | Size, color, price, stock |
| `platforms` | Object | facebook, instagram, tiktok, whatsapp |
| `status` | String | `active`, `inactive`, `out-of-stock` |

### Order
| Field | Type | Notes |
|-------|------|-------|
| `sellerId` | ObjectId | Reference to User |
| `orderNumber` | String | Auto-generated (e.g. `ORD-12345678-001`) |
| `customer` | Object | name, phone, shipping info |
| `items` | Array | productId, quantity |
| `subtotal` | Number | Sum of items |
| `shippingCost` | Number | |
| `tax` | Number | |
| `discount` | Number | |
| `totalAmount` | Number | subtotal + shipping + tax - discount |
| `paymentMethod` | String | `cash`, `card`, `bank_transfer`, `online` |
| `status` | String | `pending` → `confirmed` → `processing` → `shipped` → `delivered` / `cancelled` |
| `paymentStatus` | String | `pending`, `paid`, `failed`, `refunded` |

---

## 🔐 How Authentication Works

1. User registers or logs in → server returns a **JWT token**
2. Frontend stores the token and sends it as `Authorization: Bearer <token>` on every request
3. `authMiddleware.js` verifies the token on all protected routes
4. If the token is invalid or missing → server returns `401` or `403`

---

## 📄 License

This project is for educational purposes. Feel free to use it as a reference for learning full-stack development with the MERN stack.
