//importing models

const mongoose = require('mongoose');

const LearnerSch = mongoose.model('Learner');
const CourseSch = mongoose.model('Courses');
const MemberSch = mongoose.model('Member');

const { generateToken, verifyToken } = require('./jwt');

const getCourseCategories = async (req, res) => {
    try {
        console.log('aaaaaa');
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        console.log(userVerify)
        console.log('user verify->', loginName, role)
        if (userVerify) {
            var checkExistingCourse = await CourseSch.distinct("courseCategory");
            console.log("vedfvefsdvedf", checkExistingCourse);
            if (!checkExistingCourse.length) {
                console.log("no course exist");
                res.status(406).json({
                    msg: "No course exist"
                });
            } else {
                console.log("529");
                console.log(checkExistingCourse);
                console.log("5300");
                res.status(200).json({
                    response: true,
                    msg: "Course Categories found",
                    courseCategories: checkExistingCourse
                    // courseCode: data.courseCode
                })

            }

        } else {
            console.log('User not verified');
            res.status(406).json({
                response: "User not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
}
const allCourses = async (req, res) => {
    try {
        console.log('aaaaaa');
        const userVerify = await verifyToken(req, res);
        var loginName = userVerify.name;
        var role = userVerify.role;
        console.log(userVerify)
        console.log('user verify->', loginName, role)
        if (userVerify) {
            var checkExistingCourse = await CourseSch.find();
            console.log("vedfvefsdvedf", checkExistingCourse);
            if (!checkExistingCourse.length) {
                console.log("no course exist");
                res.status(406).json({
                    msg: "No course exist"
                });
            } else {
                console.log("529");
                console.log(checkExistingCourse);
                console.log("5300");
                res.status(200).json({
                    response: true,
                    msg: "Course found",
                    course: checkExistingCourse
                    // courseCode: data.courseCode
                })

            }

        } else {
            console.log('User not verified');
            res.status(406).json({
                response: "User not verified"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const getCourseByCourseCode = async (req, res) => {
    try {
        if (req.body.courseCode) {
            console.log('aaaaaa');
            const userVerify = await verifyToken(req, res);
            var loginName = userVerify.name;
            var role = userVerify.role;
            console.log(userVerify)
            console.log('user verify->', loginName, role)
            if (userVerify) {
                var checkExistingCourse = await CourseSch.findOne({ courseCode: req.body.courseCode });
                console.log("vedfvefsdvedf", checkExistingCourse);
                if (!checkExistingCourse) {
                    console.log("no course exist");
                    res.status(406).json({
                        msg: "No course exist with given course code"
                    });
                } else {

                    console.log(checkExistingCourse);
                    res.status(200).json({
                        response: true,
                        msg: 'Course found',
                        course: checkExistingCourse
                        // courseCode: data.courseCode
                    })

                }



            } else {
                console.log('User not verified');
                res.status(406).json({
                    response: "User not verified"
                })
            }
        } else {
            console.log('Invalid input')
            res.json({
                msg: "Invalid Input"
            })
        }


    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const getCourseByCourseName = async (req, res) => {
    try {
        if (req.body.courseName) {
            console.log('aaaaaa');
            const userVerify = await verifyToken(req, res);
            var loginName = userVerify.name;
            var role = userVerify.role;
            console.log(userVerify)
            console.log('user verify->', loginName, role)
            if (userVerify) {
                var checkExistingCourse = await CourseSch.find({ courseName: req.body.courseName });
                console.log("vedfvefsdvedf", checkExistingCourse);
                if (!checkExistingCourse.length) {
                    console.log("no course exist");
                    res.status(406).json({
                        msg: "No course exist with given course name"
                    });
                } else {

                    console.log(checkExistingCourse);
                    res.status(200).json({
                        response: true,
                        msg: `Course found: ${checkExistingCourse.length}`,
                        course: checkExistingCourse
                        // courseCode: data.courseCode
                    })

                }



            } else {
                console.log('User not verified');
                res.status(406).json({
                    response: "User not verified"
                })
            }
        } else {
            console.log('Invalid input')
            res.json({
                msg: "Invalid Input"
            })
        }


    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};

const getCourseByCategory = async (req, res) => {
    try {
        if (req.body.courseCategory) {
            console.log('aaaaaa');
            const userVerify = await verifyToken(req, res);
            var loginName = userVerify.name;
            var role = userVerify.role;
            console.log(userVerify)
            console.log('user verify->', loginName, role)
            if (userVerify) {
                var checkExistingCourse = await CourseSch.find({ courseCategory: req.body.courseCategory });
                console.log("vedfvefsdvedf", checkExistingCourse);
                if (!checkExistingCourse.length) {
                    console.log("no course exist");
                    res.status(406).json({
                        msg: "No course exist with given course category"
                    });
                } else {

                    console.log(checkExistingCourse);
                    res.status(200).json({
                        response: true,
                        msg: `Course found: ${checkExistingCourse.length}`,
                        course: checkExistingCourse
                        // courseCode: data.courseCode
                    })

                }



            } else {
                console.log('User not verified');
                res.status(406).json({
                    response: "User not verified"
                })
            }
        } else {
            console.log('Invalid input')
            res.json({
                msg: "Invalid Input"
            })
        }


    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};
const getCourseBySubCategory = async (req, res) => {
    try {
        if (req.body.courseSubCategory) {
            console.log('aaaaaa');
            const userVerify = await verifyToken(req, res);
            var loginName = userVerify.name;
            var role = userVerify.role;
            console.log(userVerify)
            console.log('user verify->', loginName, role)
            if (userVerify) {
                var checkExistingCourse = await CourseSch.find({ courseCategory: req.body.courseCategory, courseSubCategory: req.body.courseSubCategory });
                console.log("vedfvefsdvedf", checkExistingCourse);
                if (!checkExistingCourse.length) {
                    console.log("no course exist");
                    res.status(406).json({
                        msg: "No course exist with given course sub category"
                    });
                } else {

                    console.log(checkExistingCourse);
                    res.status(200).json({
                        response: true,
                        msg: `Course found: ${checkExistingCourse.length}`,
                        course: checkExistingCourse
                        // courseCode: data.courseCode
                    })

                }



            } else {
                console.log('User not verified');
                res.status(406).json({
                    response: "User not verified"
                })
            }
        } else {
            console.log('Invalid input')
            res.json({
                msg: "Invalid Input"
            })
        }


    } catch (err) {
        console.log(err);
        res.status(406).json({
            msg: err.toString()
        })
    }
};
const getModuleMedia = async (req, res) => {

    try {
        const userVerify = await verifyToken(req, res);
        console.log(userVerify)
        if (userVerify) {

            var checkFiles = await CourseSch.find({ courseCode: req.params.courseCode }, { modules: { $elemMatch: { _id: req.params.moduleId } } });
            console.log(checkFiles[0].modules[0].moduleMedia);
            if (!checkFiles[0].modules[0].moduleMedia.length) {
                res.status(406).json({
                    response: false,
                    msg: "No file found"
                })
            } else {

                res.status(200).json({
                    response: true,
                    msg: "Course media found",
                    courseMedia: checkFiles[0].modules[0].moduleMedia
                })
            }
        } else {
            res.status(406).json({
                response: "Invalid token"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            response: err
        })
    }
};

const assignedCourses = async (req, res) => {

    try {
        const userVerify = await verifyToken(req, res);
        console.log(userVerify)
        if (userVerify) {

            var checkCourses = await LearnerSch.findOne({
                _id: userVerify.id
            });
            console.log(checkCourses);

            // console.log(che);
            if (!checkCourses['courseAccess'].length) {
                res.status(406).json({
                    response: false,
                    msg: "No course is assigned"
                });
            } else {

                res.status(200).json({
                    msg: "Assigned courses found",
                    assignedCourses: checkCourses.courseAccess
                })
            }


        } else {
            res.status(406).json({
                response: "Invalid token"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(406).json({
            response: err
        })
    }
};

module.exports = {
    getCourseCategories,
    allCourses,
    getCourseByCourseCode,
    getCourseByCourseName,
    getCourseByCategory,
    getCourseBySubCategory,
    getModuleMedia,
    assignedCourses
}