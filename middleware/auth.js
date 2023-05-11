/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */

import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) return res.status(403).send('Access denied');
    if (token.startsWith('Bearir ')) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
