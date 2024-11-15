const db = require('../config/db');

exports.createPost = (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;

    db.query('INSERT INTO posts (user_id, content) VALUES (?, ?)', [userId, content], (err) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).send('Post created successfully');
    });
};

exports.getAllPosts = (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    db.query(
        `SELECT posts.*, users.username FROM posts 
         JOIN users ON posts.user_id = users.id 
         ORDER BY posts.created_at DESC 
         LIMIT ? OFFSET ?`,
        [parseInt(limit), parseInt(offset)],
        (err, results) => {
            if (err) return res.status(500).send(err.message);
            res.json(results);
        }
    );
};
