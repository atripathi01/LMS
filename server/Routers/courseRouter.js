const express = require("express");
const router = express.Router();

const courseCtrl = require('../Controllers/courseController');

router.get('/categories', courseCtrl.getCourseCategories)

router.get('/all', courseCtrl.allCourses);

router.post('/get-by-course-code', courseCtrl.getCourseByCourseCode);

router.post('/get-by-course-name', courseCtrl.getCourseByCourseName);

router.post('/get-by-course-category', courseCtrl.getCourseByCategory);

router.post('/get-by-sub-category', courseCtrl.getCourseBySubCategory);

router.get('/module-media/:courseCode/:moduleId', courseCtrl.getModuleMedia);

router.get('/assigned', courseCtrl.assignedCourses);

module.exports = router;
