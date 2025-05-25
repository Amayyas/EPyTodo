const db = require('../../config/db');

const getAllTodos = (callback) => {
    const query = 'SELECT id, title, description, created_at, due_time, user_id, status FROM todo';
    db.query(query, callback);
};

const getTodoById = (id, callback) => {
    const query = 'SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?';
    db.query(query, [id], callback);
};

const createTodo = (todoData, callback) => {
    const { title, description, due_time, user_id, status } = todoData;
    const query = 'INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, description, due_time, user_id, status || 'not started'], callback);
};

const updateTodo = (id, todoData, callback) => {
    const { title, description, due_time, user_id, status } = todoData;
    const query = 'UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?';
    db.query(query, [title, description, due_time, user_id, status, id], callback);
};

const deleteTodo = (id, callback) => {
    const query = 'DELETE FROM todo WHERE id = ?';
    db.query(query, [id], callback);
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};
