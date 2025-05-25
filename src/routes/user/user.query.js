const db = require('../../config/db');

const getUserById = (id, callback) => {
    const query = 'SELECT id, email, password, name, firstname, created_at FROM user WHERE id = ?';
    db.query(query, [id], callback);
};

const getUserByEmail = (email, callback) => {
    const query = 'SELECT id, email, password, name, firstname, created_at FROM user WHERE email = ?';
    db.query(query, [email], callback);
};

const getUserTodos = (userId, callback) => {
    const query = 'SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE user_id = ?';
    db.query(query, [userId], callback);
};

const updateUser = (id, userData, callback) => {
    const { email, password, name, firstname } = userData;
    const query = 'UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?';
    db.query(query, [email, password, name, firstname, id], callback);
};

const deleteUser = (id, callback) => {
    const query = 'DELETE FROM user WHERE id = ?';
    db.query(query, [id], callback);
};

module.exports = {
    getUserById,
    getUserByEmail,
    getUserTodos,
    updateUser,
    deleteUser
};
