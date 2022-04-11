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

const assgCtrl = require('../Controllers/assignemntController');

router.post('/upload', assgCtrl.uploadAssignmentSolution);

router.post('/view-my', assgCtrl.viewAssignmentLearner);

router.post('/view-all', assgCtrl.viewAllAssignments);

router.post('/marks', assgCtrl.assignMarks)


module.exports = router;
