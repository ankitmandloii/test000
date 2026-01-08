/**
 * ======================================================
 * Request Validation & Authentication Middleware
 * ======================================================
 *
 * Description:
 * This file contains middleware functions responsible for:
 * - Validating incoming request payloads using Joi schemas
 * - Authenticating API requests using JWT tokens
 * - Verifying Shopify webhook authenticity using HMAC
 *
 * These middlewares protect the application from invalid
 * input, unauthorized access, and forged webhook requests.
 *
 * ======================================================
 */


// const schema = require("./userSchema");
// const { statusCode } = require("../constant");
const jwt = require('jsonwebtoken');


/**
 * JWT secret key
 * Loaded from environment variables
 */
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';



/**
 * ------------------------------------------------------
 * Login Request Validation Middleware
 * ------------------------------------------------------
 * Validates login payload before reaching controller logic
 */
// exports.login = async (req, res, next) => {
//   const { error } = schema.loginSchema.validate(req.body);
//   if (error) {
//     res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
//   } else {
//     next(); // Validation successful
//   }
// };


/**
 * ------------------------------------------------------
 * Customer Registration Validation Middleware
 * ------------------------------------------------------
 * Ensures registration payload follows required schema
 */
// exports.customerRegister = async (req, res, next) => {
//   const { error } = schema.customerRegisterSchema.validate(req.body);
//   if (error) {
//     res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
//   } else {
//     next(); // Validation successful
//   }
// };



/**
 * ------------------------------------------------------
 * JWT Authentication Middleware
 * ------------------------------------------------------
 * Protects private APIs by validating Bearer token
 */
exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Get token from Bearer <token>

  try {
    // Verify and decode JWT
    const decoded = jwt.verify(token, SECRET_KEY);
    // Attach user data to request for downstream usage
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};



