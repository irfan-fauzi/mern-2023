/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// REGISTER
export const register = async (req, res) => {
  try {
    const {
      fistName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // when create new user
    const newUser = new User({
      fistName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impression: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
// eslint-disable-next-line consistent-return
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User do dot exist' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'invalid credential' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    register.status(200).json(token, user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
