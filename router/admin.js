const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');

router.post('/advisor', adminController.advisor);
// router.post('/addAlumni', adminController.addAlumni);
// router.post('/addCourse', adminController.addCourse);

module.exports = router;
