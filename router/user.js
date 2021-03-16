const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:userId/advisor', userController.allAdvisors);
router.post('/:userId/advisor/:advisorId', userController.bookAdvisor);
router.get('/:userId/advisor/booking', userController.allBookings);

module.exports = router;
