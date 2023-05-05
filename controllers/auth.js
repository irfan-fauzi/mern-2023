/* eslint-disable linebreak-style */
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
