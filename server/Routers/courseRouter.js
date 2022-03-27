const express = require("express");
const router = express.Router();

const courseCtrl = require('../Controllers/courseController');

router.get('/all', courseCtrl.allCourses);

router.post('/get-by-course-code', courseCtrl.getCourseByCourseCode);

router.post('/get-by-course-name', courseCtrl.getCourseByCurseName);

router.post('/get-by-course-category', courseCtrl.getCourseByCategory);

router.get('/media/:courseCode', courseCtrl.getCourseMedia);

router.get('/assigned', courseCtrl.assignedCourses);

module.exports = router;
