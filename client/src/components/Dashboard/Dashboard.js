import React, { useEffect, useState } from "react";
import UploadContentDialog from "./UploadContentDialog";
import classes from "./dashboard.module.css";
import VideoPlayer from "react-video-js-player";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import pdfpng from '../images/pdf.png'
// import { appBarClasses } from "@mui/material";

// import { Document, Page } from "react-pdf";

const Dashboard = (props) => {
  //---------> passing all props from app.js page<------------
  const dashboardSection = props.dashboardSection;

  // ------------> intialize state
  const [items, setItems] = useState([]);
  const [activvDashboardSection, setActiveDashboardSection] = useState(
    Object.keys(dashboardSection)[0]
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // -------------> fetch token And role from localStorage
  const token = window.localStorage.getItem("token");
  const role = window.localStorage.getItem("role");

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // console.log(token);
  // console.log(items);

  useEffect(() => {
    axios
      .post("/get-all-file")
      .then((response) => {
        if (response.status === 200) {
          console.log("fetched", response.data);
          setItems(response.data.mediaData);
        } else {
          console.log("failed fetch");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  //_------------------> dashboard section of dashboard page
  const Courses = (
    <>
      <div style={{ margin: "2rem" }}>
        {token ? role === "trainer" && <UploadContentDialog /> : ""}
      </div>
      <section style={{ marginLeft: "2rem" }}>
        <div>
          <h1>Dashboard</h1>
          <div
            className={classes.courseCard}
            // style={{
            //   display: "flex",
            //   // flexWrap: "wrap",
            //   // flexDirection: "row",

            // }}
          >
            {items.map((course) => (
              // <div>
              //   {course.mediaType === "mp4" ? (

              //     // ------------------ mp4 video player ---------------
              //    <div style={{margin:"2rem"}}>
              //      {/* ---------------vedio player---------------- */}
              //     <VideoPlayer
              //       src={`http://localhost:5000/uploads/${course.courseMedia}`}
              //       width="320px"
              //       height="250px"
              //       playbackRates={[0.5, 1, 1.5, 2]}
              //     ></VideoPlayer>
              //     </div>
              //   ) : (
              //     // ------------------ pdf viewer model user -----------------
              //     <div style={{margin:"2rem"}}>
              //       <button style={{width:'320px',height:"250px",fontSize:"65px"}} onClick={handleOpen}>
              //       <img scr="../images/pdf.png" alt="pdf" style={{width:"100px",height:"auto"}} />
              //       </button>

              //       <Modal
              //         open={open}
              //         onClose={handleClose}
              //         aria-labelledby="modal-modal-title"
              //         aria-describedby="modal-modal-description"
              //       >
              //         <Box
              //           style={{
              //             position: "absolute",
              //             top: "50%",
              //             left: "50%",
              //             transform: "translate(-50%, -50%)",
              //             width: 700,
              //             height: "80vh",
              //           }}
              //         >

              //           {/* -------------pdf viewer------------ */}
              //           <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
              //             <Viewer
              //               fileUrl={`http://localhost:5000/uploads/${course.courseMedia}`}
              //               plugins={[defaultLayoutPluginInstance]}
              //             />
              //           </Worker>
              //         </Box>
              //       </Modal>
              //     </div>
              //   )}
              // </div>
              <>
                <div className={classes.card}>
                  <div className={classes.courseNaamm}>Course Name</div>
                  {/* <div>{course._id}</div> */}
                  <a href={`/dashboard/${course._id}`}>
                    <button className={classes.viewCourseBtn} type="button">
                      Veiw Course <ArrowForwardIcon />
                    </button>
                  </a>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  //-------------->course section of dashboard page
  const Dashboard= (
    <h1 style={{ width: "900px", textAlign: "center" }}>Courses</h1>
  );

  //--------------> pdfs section of dashboard page
  const PDFs = <h1 style={{ width: "900px", textAlign: "center" }}>PDFS</h1>;

  const generateDashboardSection = () => {
    switch (dashboardSection[activvDashboardSection]) {
      case dashboardSection.dashboard:
        return Dashboard; //dashboard section
      case dashboardSection.courses:
        return Courses; //course section
      case dashboardSection.allpdf:
        return PDFs; //pdfs section
      default:
        return null;
    }
  };

  return (
    <>
      <section className={classes.dash}>
        <div className={classes.dashNav}>
          <div></div>

          {/* -------------> side menu of dashboard page<---------------- */}
          {Object.keys(dashboardSection)?.map((key) => (
            <div
              className={`${classes.dashboardItems} ${
                activvDashboardSection === key ? classes.activeDash : " "
              }`}
              key={key}
              onClick={() => setActiveDashboardSection(key)}
            >
              {dashboardSection[key]}
            </div>
          ))}
        </div>

        {/* ------------------> detail section of side menu item <--------------------- */}
        <div className={classes.dashItemDetail}>
          {generateDashboardSection()}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
