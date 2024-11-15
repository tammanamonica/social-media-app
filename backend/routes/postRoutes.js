const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createPost);
router.get('/', authenticate, getAllPosts);

module.exports = router;
