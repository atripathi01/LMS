import React, { useState } from "react";
import Adver from "../images/home7.svg";
import classes from "./home.module.css";
import Footer from "./PageComponents/Footer";
import createCouresImg from "../images/createcourse.svg";
import EnrolImg from "../images/enrolse.png";
import { DASH_BOARD, LOGIN_PATH } from "../../constants/pathContainer";
import { Link } from "react-router-dom";


const Home = () => {
   
   // create object for build section of landing page
  const buildCourse = {
    createCourse: "Create courses easily",
    uploadPDFnNotes: "Upload PDF's and Notes",
    adTestnQuiz: "Add Tests and Quizzes",
  };

  // create object for enroll section of landing page
  const enrollCourse = {
    enrollCourses: "Enroll the Course, just in a click",
    downloadPDF: "Download PDF's and Notes",
    startQuiz: "Start the Tests and Quizzes",
  };

  const [activeBuildpart, setActiveBuildPart] = useState(
    Object.keys(buildCourse)[0]
  );
  const [activateCourse, setActivatCourse] = useState(
    Object.keys(enrollCourse)[0]
  );

  // fetching token form local storage 
  const token = window.localStorage.getItem("token");

  //  createCourse section of buildCourse object
  const CourseCreaterSection = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "7rem",
        flexDirection: "column",
      }}
    >
      <img src={createCouresImg} alt="creater" />
      <p className={classes.para}>
        Hook your learners from the start. Gamify courses with badges, points,
        levels, leaderboards, and rewards.
      </p>
    </div>
  );

  // uploadPDFnNotes section of buildCourse object
  const uploadSection = (
    <p className={classes.para}>
      At Open LMS, one of the ways we support learning is via our commitment to
      open-source learning technology. The ability to deliver educational
      materials on a customized, branded platform is highly appealing to
      companies looking to teach or train students, employees, volunteers, or
      customers. Opening up a flexible opportunity for your organization to
      adapt your open-source LMS without vendor and commitment pressure.
    </p>
  );

  // adTestnQuiz section of buildCourse object
  const addQuizSection = (
    <p className={classes.para}>
      Set up detailed learning paths and completion rules to guide learner
      growth. Group related courses into categories so learners can easily find
      what they’re looking for.
    </p>
  );

  // enrollCourses section of enrollCourse object
  const enrollSection = (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: "7rem",
        flexDirection: "column",
      }}
    >
      <img src={EnrolImg} alt="creater" />
      <p className={classes.para}>
        Hook your learners from the start. Gamify courses with badges, points,
        levels, leaderboards, and rewards.
      </p>
    </div>
  );
  
  // downlaodPDF section of enrollCourse object
  const downloadSection = (
    <p>
      Keep learners engaged by staying in touch when you can’t be face to face.
      Easily host video conferences, leave feedback, start discussions, send
      messages, and more.
    </p>
  );

  // startQuiz section of enrollCourse object
  const StartTestSection = (
    <p className={classes.para}>
      Create unlimited sub-accounts to match your organization’s structure and
      manage them all from one place. Customize each sub-account so they’re
      tailor-made for different teams, departments, and audiences.
    </p>
  );

  // switch cases for buildCourses object
  const generatonCreate = () => {
    switch (buildCourse[activeBuildpart]) {
      case buildCourse.createCourse:
        return CourseCreaterSection;
      case buildCourse.uploadPDFnNotes:
        return uploadSection;
      case buildCourse.adTestnQuiz:
        return addQuizSection;
      default:
        return null;
    }
  };

  //switch cases for enrollCourse object
  const generateEnroll = () => {
    switch (enrollCourse[activateCourse]) {
      case enrollCourse.enrollCourses:
        return enrollSection;
      case enrollCourse.downloadPDF:
        return downloadSection;
      case enrollCourse.startQuiz:
        return StartTestSection;
      default:
        return null;
    }
  };


  return (
    <section className={classes.HomePage}>
      <div className={classes.firstSection}>
        <div className={classes.leftPart}>
          <p className={classes.Lms}>THE LMS</p>
          <h1 className={classes.build}>built for success!</h1>
          <p className={classes.throught}>
            Your online course deserves the best! Come for the training, stay
            for the experience
          </p>
          <div className={classes.butns}>
            {token ? (
              <Link to={DASH_BOARD}>
                {" "}
                <button className={classes.homepgResiBtn}>Dashboard</button>
              </Link>
            ) : (
              <Link to={LOGIN_PATH}>
                {" "}
                <button className={classes.homepgResiBtn}>Login</button>
              </Link>
            )}
          </div>
        </div>
        <div className={classes.rightPart}>
          <img src={Adver} alt="imgaaaaa" className={classes.ImageSection} />
        </div>
      </div>
      <div className={classes.sectionTitle}>
        <div className={classes.topic}>
          Build <br />
          <div className={classes.blank}></div>
        </div>
      </div>
      <section className={classes.center}>
        <div className={classes.ThirdSection}>
          <div className={classes.divider}></div>
          <div className={classes.features}>
            {Object.keys(buildCourse)?.map((key) => (
              <div
                key={key}
                onClick={() => setActiveBuildPart(key)}
                className={`${classes.featuresListItem} ${
                  activeBuildpart === key ? classes.activeDetail : " "
                }`}
              >
                {buildCourse[key]}
              </div>
            ))}
          </div>
          <div className={classes.detailOfActiveSection}>
            {generatonCreate()}
          </div>
        </div>
      </section>
      <div className={classes.sectionTitle}>
        <div className={classes.topic}>
          Enroll <br />
          <div className={classes.blank}></div>
        </div>
      </div>
      <section className={classes.center}>
        <div className={classes.ForthSection}>
          <div className={classes.stdFeature}>
            {Object.keys(enrollCourse)?.map((key) => (
              <div
                key={key}
                onClick={() => setActivatCourse(key)}
                className={`${classes.stdDetailItem} ${
                  activateCourse === key ? classes.activeDetailForStd : " "
                }`}
              >
                {enrollCourse[key]}
              </div>
            ))}
          </div>
          <div className={classes.DetailForStd}>{generateEnroll()}</div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Home;
