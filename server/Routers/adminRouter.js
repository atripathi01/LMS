const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const _ = require("lodash");

const fileUpload = require("express-fileupload");

// enable files upload
router.use(
    fileUpload({
        createParentPath: true,
    })
);


router.use(morgan("dev"));

const adminCtrl = require('../Controllers/adminController');

router.post('/sign-in', adminCtrl.signIn);
router.post('/update-course/:code', adminCtrl.updateCourse);

router.post('/member-register', adminCtrl.memberRegister);

router.get('/get-all-members', adminCtrl.getAllMembers);

router.get('/get-all-trainers', adminCtrl.getAllTrainers);

router.get('/get-all-learners', adminCtrl.getAllLearners);

router.post('/create-course', adminCtrl.createCourse);

router.post('/update-course/:code', adminCtrl.updateCourse);

router.post('/delete-course/:code', adminCtrl.deleteCourse);

router.post('/upload-course-media', adminCtrl.uploadCourseMedia);

router.post('/delete-course-media/:courseCode/:mediaName', adminCtrl.deleteCourseMedia);

router.post('/assign-course/:courseCode/:email', adminCtrl.assignCourse);

module.exports = router;
