const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const taskRoutes = require('./tasks.routes');


router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;    

