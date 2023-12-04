// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
} = require('../controllers/userController');

// GET all users
router.get('/', getUsers);

// POST create a new user
router.post('/', createUser);

// PATCH update a user
router.patch('/:userId', updateUser);

// DELETE delete a user
router.delete('/:userId', deleteUser);

// GET search users by first name
router.get('/search', searchUsers);

module.exports = router;
