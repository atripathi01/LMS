import React, { useState } from "react";
import Adver from "../images/homepage6.svg";
import classes from "./home.module.css";
import Footer from "./PageComponents/Footer";

const Home = () => {
  const buildCourse = {
    createCourse: "Create courses easily",
    uploadPDFnNotes: "Upload PDF's and Notes",
    adTestnQuiz: "Add Tests and Quizzes",
  };
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
  const CourseCreaterSection = <h1>CourseCreaterSection</h1>;
  const uploadSection = <h1>uploadSection</h1>;
  const addQuizSection = <h1>addQuizSection</h1>;
  const enrollSection = <h1>enrollSection</h1>;
  const downloadSection = <h1>downloadSection</h1>;
  const StartTestSection = <h1>StartTestSection</h1>;

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
          <h1 className={classes.buildSuccess}>built for success!</h1>
          <p className={classes.throught}>
            Your online course deserves the best! Come for the training, stay
            for the experience
          </p>
          <div className={classes.butns}>
            {/* <button className={classes.HomepageLoginbtn}>Login</button> */}
       
            <button className={classes.homepgResiBtn}>Get Started</button>
          </div>
        </div>
        <div className={classes.rightPart}>
          <img
            src={Adver}
            alt="imgaaaaa"
            className={classes.ImageSection}
           
          />
        </div>
      </div>
        <div className={classes.sectionTitle}>
          <div className={classes.topic}>Build  <br /> 
          <div className={classes.blank}></div></div>
        
        </div>
      <section className={classes.center}>
      <div className={classes.ThirdSection}>
        <div className={classes.divider}></div>
        <div className={classes.features}>
          {Object.keys(buildCourse)?.map((key) => (
            <div key={key} onClick={() => setActiveBuildPart(key)} 
             className={`${classes.featuresListItem} ${activeBuildpart===key?classes.activeDetail:" "}`}
            >
              {buildCourse[key]}
            </div>
          ))}
        </div>
        <div className={classes.detailOfActiveSection}>{generatonCreate()}</div>
      </div>
      </section>
      <div className={classes.sectionTitle}>
          <div className={classes.topic}>Enroll <br />
          <div className={classes.blank}></div></div>
         
        </div>
      <section className={classes.center}>
      <div className={classes.ForthSection}>
        <div className={classes.stdFeature} >
          
          {Object.keys(enrollCourse)?.map((key) => (
            <div key={key} onClick={() => setActivatCourse(key)}
             className={`${classes.stdDetailItem} ${activateCourse===key?classes.activeDetailForStd:" "}`}
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
