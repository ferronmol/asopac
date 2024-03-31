const User = require('../Routes/Models/UserModel');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
// if no user is found, create a new user
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

