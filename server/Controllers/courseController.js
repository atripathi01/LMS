

//importing models

const mongoose = require('mongoose');

const RegistrationSch = mongoose.model('Registration');
const CourseSch = mongoose.model('Courses');
const CourseMediaSch = mongoose.model('CourseMedia');

const { generateToken, verifyToken } = require('./jwt');


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

const getCourseByCurseName = async (req, res) => {
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

const getCourseMedia = async (req, res) => {

    try {
        const userVerify = await verifyToken(req, res);
        console.log(userVerify)
        if (userVerify) {

            var checkFiles = await CourseMediaSch.find({
                courseCode: req.params.courseCode
            });

            if (!checkFiles.length) {
                res.status(406).json({
                    response: false,
                    msg: "No file found"
                })
            } else {

                res.status(200).json({
                    response: true,
                    msg: "Course media found",
                    courseMedia: checkFiles
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

            var checkCourses = await RegistrationSch.findOne({
                email: req.body.email
            });
            console.log(checkCourses);
            if (!checkCourses) {
                res.status(406).json({
                    response: false,
                    msg: "Invalid email"
                })
            } else {
                // console.log(che);
                if(!checkCourses['courseAccess'].length) {
                    res.status(406).json({
                        response: false,
                        msg: "No course is assigned"
                    });
                } else {

                    res.status(200).json({
                        response: true,
                        msg: "Assigned courses found",
                        assignedCourses: checkCourses
                    })
                }
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

    allCourses,
    getCourseByCourseCode,
    getCourseByCurseName,
    getCourseByCategory,
    getCourseMedia,
    assignedCourses
}
