const router = require('express').Router();
const taskController = require('../controller/tasks.controller')
const {verifyToken} = require('../validations/customerValidation')


router.post('/createTask',verifyToken, taskController.createTask);
router.delete('/deleteTask/:id',verifyToken, taskController.deleteTask);  // :id is passed as URL parameter
router.post('/updateTask/:id',verifyToken, taskController.updateTask);  // :id is passed as URL parameter
router.get('/getTasks',verifyToken, taskController.getTasks);  


module.exports = router;