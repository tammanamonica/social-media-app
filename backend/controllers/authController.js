const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).send('Fields are required.');

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).send('User registered successfully');
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).send('Fields are required.');

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send(err.message);
        if (results.length === 0) return res.status(404).send('User not found');

        const isValidPassword = await bcrypt.compare(password, results[0].password);
        if (!isValidPassword) return res.status(401).send('Invalid credentials');

        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
