const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const router = express.Router();
require('dotenv').config();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { email, name, firstname, password } = req.body;

        if (!email || !name || !firstname || !password) {
            return res.status(400).json({ msg: 'Bad parameter' });
        }

        // Check if user already exists
        const checkUserQuery = 'SELECT * FROM user WHERE email = ?';
        db.query(checkUserQuery, [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            if (results.length > 0) {
                return res.status(409).json({ msg: 'Account already exists' });
            }

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert user
            const insertUserQuery = 'INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)';
            db.query(insertUserQuery, [email, name, firstname, hashedPassword], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ msg: 'Internal server error' });
                }

                // Generate JWT token
                const payload = {
                    id: result.insertId,
                    email: email
                };

                jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                    }
                    res.status(201).json({ token });
                });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Login route
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Bad parameter' });
        }

        // Find user
        const findUserQuery = 'SELECT * FROM user WHERE email = ?';
        db.query(findUserQuery, [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ msg: 'Invalid Credentials' });
            }

            const user = results[0];

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ msg: 'Invalid Credentials' });
            }

            // Generate JWT token
            const payload = {
                id: user.id,
                email: user.email
            };

            jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ msg: 'Internal server error' });
                }
                res.json({ token });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

module.exports = router;
