import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export async function privateRoute(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      // Retrieve the token from headers
      token = req.headers.authorization.split(' ')[1];

      // Decode token to get id prop
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user using id
      req.user = await User.findById(decoded.id).select('-password');

      // Continue to me controller
      next();
    } catch (err) {
      res.status(401).json({ success: false, error: 'Not authorized' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }
}
