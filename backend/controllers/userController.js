// controllers/userController.js

const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  const { name, email, phone, label } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      phone,
      label,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedFields = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set:updatedFields
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchUsers = async (req, res) => {
    const { firstName } = req.query;
  
    try {
      const users = await User.find({ name: { $regex: new RegExp(firstName, 'i') } });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
};

