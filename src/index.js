const express = require('express');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const todoRoutes = require('./routes/todos/todos');

// Import middleware
const notFound = require('./middleware/notFound');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', todoRoutes);

// 404 handler
app.use('*', notFound);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
