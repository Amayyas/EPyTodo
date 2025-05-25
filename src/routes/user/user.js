const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const { getUserById, getUserByEmail, getUserTodos, updateUser, deleteUser } = require('./user.query');
const router = express.Router();

// Get current user info
router.get('/user', auth, (req, res) => {
    try {
        getUserById(req.user.id, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ msg: 'Not found' });
            }

            res.json(results[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Get current user todos
router.get('/user/todos', auth, (req, res) => {
    try {
        getUserTodos(req.user.id, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            res.json(results);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Get user by ID or email
router.get('/users/:identifier', auth, (req, res) => {
    try {
        const { identifier } = req.params;
        
        // Check if identifier is a number (ID) or email
        const isId = /^\d+$/.test(identifier);
        
        const callback = (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ msg: 'Not found' });
            }

            res.json(results[0]);
        };

        if (isId) {
            getUserById(parseInt(identifier), callback);
        } else {
            getUserByEmail(identifier, callback);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Update user
router.put('/users/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, name, firstname } = req.body;

        if (!email || !password || !name || !firstname) {
            return res.status(400).json({ msg: 'Bad parameter' });
        }

        // Hash password if provided
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            email,
            password: hashedPassword,
            name,
            firstname
        };

        updateUser(parseInt(id), userData, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: 'Not found' });
            }

            // Return updated user
            getUserById(parseInt(id), (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ msg: 'Internal server error' });
                }

                res.json(results[0]);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Delete user
router.delete('/users/:id', auth, (req, res) => {
    try {
        const { id } = req.params;

        deleteUser(parseInt(id), (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: 'Not found' });
            }

            res.json({ msg: `Successfully deleted record number: ${id}` });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

module.exports = router;
