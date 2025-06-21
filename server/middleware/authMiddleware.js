import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, please log in again' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.company = await Company.findById(decoded.id).select('-password');

    next(); // must call next() to proceed to the route
  } catch (error) {
    console.log("Error in protectCompany middleware:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
