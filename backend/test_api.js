import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your-secret-key'; // Change this to a secure key in production

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Simple in-memory token blacklist for logout
const tokenBlacklist = new Set();

// Mock supplier data for test API
const suppliers = [
  {
    id: 1,
    name: 'Fournitures Dubois',
    phone: '01 23 45 67 89',
    email: 'contact@dubois.fr',
    city: 'Lyon',
    category: 'Électronique',
  },
  {
    id: 2,
    name: 'Atelier Parisien',
    phone: '06 12 34 56 78',
    email: 'info@atelierparisien.fr',
    city: 'Paris',
    category: 'Mobilier',
  },
  {
    id: 3,
    name: 'Matériel Pro Sud',
    phone: '04 98 76 54 32',
    email: 'contact@materielprosud.fr',
    city: 'Marseille',
    category: 'Fournitures de bureau',
  },
];

// Mock user data (test API, no hashing required)
const users = [
  {
    id: 1,
    username: 'testuser',
    password: 'password123',
    email: 'testuser@example.com',
    name: 'Test User',
  },
  {
    id: 2,
    username: 'alice',
    password: 'alice123',
    email: 'alice@example.com',
    name: 'Alice Example',
  },
  {
    id: 3,
    username: 'bob',
    password: 'bob123',
    email: 'bob@example.com',
    name: 'Bob Example',
  },
];

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Access token required' });
  if (tokenBlacklist.has(token)) return res.status(401).json({ message: 'Token has been logged out' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    req.token = token;
    next();
  });
};

// Fonction commune pour générer la réponse d'authentification
const generateAuthResponse = (user, statusCode = 200) => {
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
  };
  return { token, user: userData, statusCode };
};

// Route d'authentification unique (login et register)
app.post('/register', (req, res) => {
  const { username, password, email, name } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    username,
    password,
    email: email || `${username}@example.com`,
    name: name || username,
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully. Please login.' });
});

// Login route
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    return res.status(400).json({ message: 'Username or email and password are required' });
  }

  const user = users.find(
    (u) => (username && u.username === username) || (email && u.email === email)
  );
  if (!user) return res.status(400).json({ message: 'User not found' });
  if (password !== user.password) return res.status(400).json({ message: 'Invalid password' });

  const { token, user: userData } = generateAuthResponse(user);
  res.json({ token, user: userData });
});

// Get current authenticated user
app.get('/me', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user: { id: user.id, username: user.username, email: user.email, name: user.name } });
});

// Suppliers routes
app.get('/suppliers', (req, res) => {
  res.json(suppliers);
});

app.get('/suppliers/:id', (req, res) => {
  const supplier = suppliers.find((item) => item.id === Number(req.params.id));
  if (!supplier) {
    return res.status(404).json({ message: 'Supplier not found' });
  }
  res.json(supplier);
});

app.post('/suppliers', (req, res) => {
  const { name, phone, email, city, category } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const newSupplier = {
    id: suppliers.length ? Math.max(...suppliers.map((item) => item.id)) + 1 : 1,
    name,
    phone: phone || '',
    email,
    city: city || '',
    category: category || '',
  };
  suppliers.push(newSupplier);
  res.status(201).json(newSupplier);
});

app.put('/suppliers/:id', (req, res) => {
  const supplierId = Number(req.params.id);
  const supplier = suppliers.find((item) => item.id === supplierId);
  if (!supplier) {
    return res.status(404).json({ message: 'Supplier not found' });
  }
  const { name, phone, email, city, category } = req.body;
  Object.assign(supplier, {
    name: name ?? supplier.name,
    phone: phone ?? supplier.phone,
    email: email ?? supplier.email,
    city: city ?? supplier.city,
    category: category ?? supplier.category,
  });
  res.json(supplier);
});

app.delete('/suppliers/:id', (req, res) => {
  const supplierId = Number(req.params.id);
  const index = suppliers.findIndex((item) => item.id === supplierId);
  if (index === -1) {
    return res.status(404).json({ message: 'Supplier not found' });
  }
  suppliers.splice(index, 1);
  res.status(204).end();
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! This is a protected route.` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});