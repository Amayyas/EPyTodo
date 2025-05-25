const express = require('express');
const auth = require('../../middleware/auth');
const { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require('./todos.query');
const router = express.Router();

// Get all todos
router.get('/todos', auth, (req, res) => {
    try {
        getAllTodos((err, results) => {
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

// Get todo by ID
router.get('/todos/:id', auth, (req, res) => {
    try {
        const { id } = req.params;

        getTodoById(parseInt(id), (err, results) => {
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

// Create todo
router.post('/todos', auth, (req, res) => {
    try {
        const { title, description, due_time, user_id, status } = req.body;

        if (!title || !description || !due_time || !user_id) {
            return res.status(400).json({ msg: 'Bad parameter' });
        }

        const todoData = {
            title,
            description,
            due_time,
            user_id,
            status: status || 'not started'
        };

        createTodo(todoData, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            // Return the created todo
            getTodoById(result.insertId, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ msg: 'Internal server error' });
                }

                res.status(201).json(results[0]);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Update todo
router.put('/todos/:id', auth, (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, due_time, user_id, status } = req.body;

        if (!title || !description || !due_time || !user_id || !status) {
            return res.status(400).json({ msg: 'Bad parameter' });
        }

        const todoData = {
            title,
            description,
            due_time,
            user_id,
            status
        };

        updateTodo(parseInt(id), todoData, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: 'Not found' });
            }

            // Return the updated todo
            getTodoById(parseInt(id), (err, results) => {
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

// Delete todo
router.delete('/todos/:id', auth, (req, res) => {
    try {
        const { id } = req.params;

        deleteTodo(parseInt(id), (err, result) => {
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
