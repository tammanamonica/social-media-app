const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'social_media',
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err.message);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = db;
