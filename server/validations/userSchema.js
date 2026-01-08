/**
 * ======================================================
 * Authentication & User Validation Schemas
 * ======================================================
 *
 * Description:
 * This file defines Joi schemas used to validate incoming
 * request payloads for authentication and user registration.
 * These schemas ensure data integrity and prevent invalid
 * or malformed requests from reaching business logic.
 *
 * Purpose:
 * - Validate login credentials
 * - Validate customer registration data
 * - Enforce required fields and formats
 *
 * Library Used:
 * - Joi (schema-based data validation)
 *
 * ======================================================
 */


const Joi = require("joi");

/**
 * -----------------------------
 * Login Request Validation
 * -----------------------------
 * Validates payload for user login API
 */
exports.loginSchema = Joi.object({
    // User email address (must be valid format)
    email: Joi.string().email().required(),
    // User password
    password: Joi.string().required(),
    // User role (used for role-based authentication)
    role: Joi.string().required(),
});

/**
 * -----------------------------
 * Customer Registration Validation
 * -----------------------------
 * Validates payload for customer/admin registration API
 */
exports.customerRegisterSchema = Joi.object({
    // Full name of the user
    userName: Joi.string().required(),
    // User email address (must be valid format)
    email: Joi.string().email().required(),
    // User contact number
    phoneNumber: Joi.string().required(),
    // Account password
    password: Joi.string().required(),
    // Allowed roles for registration
    role: Joi.string().valid("customer", "admin").required(),
});




