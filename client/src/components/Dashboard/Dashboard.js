import React, { useEffect, useState } from "react";
// import UploadContentDialog from "./UploadContentDialog";
import classes from "./dashboard.module.css";
// import VideoPlayer from "react-video-js-player";
// import axios from "axios";
import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import { Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {selectUser} from '../../features/userSlice'
import {useSelector} from 'react-redux'
import UploadCourse from "./uploadCourses/UploadCourse";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import folderImg from "../images/folder.svg";
// import  { useDropzone } from "react-dropzone";
// import UploadIcon from "@mui/icons-material/Upload";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
// import classes from "./upoloadDialog.module.css";
// import axios from "axios";
// import { useState } from "react";
import { Navigate } from "react-router-dom";
import { DASH_BOARD } from "../../constants/pathContainer";
// import {selectUser} from '../../features/userSlice'
// import {useSelector} from 'react-redux'

// import pdfpng from '../images/pdf.png'
// import { appBarClasses } from "@mui/material";

// import { Document, Page } from "react-pdf";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
const Dashboard = (props) => {
  //---------> passing all props from app.js page<------------
  const dashboardSection = props.dashboardSection;
  const user=useSelector(selectUser);
  // ------------> intialize state
  const [items, setItems] = useState([]);
  const [opens, setOpens] = React.useState(false);
  const [courseCode, setCourseCode] = React.useState("");
  const [courseTitle, setCourseTitle] = React.useState("");
  const [courseCategory, setCourseCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
//   const [items,setItems]=useState("");
  const [activvDashboardSection, setActiveDashboardSection] = useState(
    Object.keys(dashboardSection)[0]
  );
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  // -------------> fetch token And role from localStorage
//   const token = window.localStorage.getItem("token");
//   const role = window.localStorage.getItem("role");

//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // console.log(token);
  // console.log(items);
 
  useEffect(() => {
    fetch("/all-courses",{
        "method":"GET",
        headers: {
            "Content-Type": "application/json",
            "accepts": "application/json",
            "authorization":`Bearer ${user.token}`,

          },
      })
      .then(async(response)=>{
         const res=await response.json()
      
         if (response.status === 200) {
           console.log("fetched", res.course);
           setItems(res.course);
         } else {
           console.log("failed fetch");
         }})
     
      .catch((err) => {
        console.log("error", err);
      });
  },[]);


  function onSubmit(e){
     
    const courseData={
        courseCode:courseCode,
        courseName:courseTitle,
        description:description,
        courseCategory:courseCategory,
        
    }
    console.log(courseData);
     fetch("/admin/create-course",{
         method:"POST",
      headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${user.token}`,
        },
        body:JSON.stringify(courseData),
     }).then(async(response)=>{
         const res= await response.json();

        
         if(response.status!==200){
            window.alert(res.msg)
            console.log(response.status);
            console.log(res.msg);

         }
         else if(response.status===200){
             setOpens(false);
            window.alert("Folder Created Successfully!!")
            
         }
     }).catch((err)=>{
         window.alert("Failed!!")
         console.log(err)
     })

  //    handleClickCollo();
}

const createFolderButton=()=>{
    const handleClickOpen = () => {
        return setOpens(true);
      };
    
      const handleClickClose = () => {
        Navigate(DASH_BOARD)
         return setOpens(false);
        
      };
    return(
        <div>
        <Button
          className={classes.uploadButn}
          variant="contained"
          onClick={handleClickOpen}
        >
          Create Course
        </Button>
        <Dialog
          fullScreen
          open={opens}
          onClose={handleClickClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClickClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Create Course Folder
              </Typography>
              <Button autoFocus color="inherit"  onClick={(e)=>onSubmit(e)}>
                CREATE
                
              </Button>
            </Toolbar>
          </AppBar>
          {/* <section>
            <div
              {...getRootProps()}
              style={{
                width: "100%",
                height: "300px",
                border: "#acacac 2px dotted",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input {...getInputProps()} />
              <Button>
                upload video
                <UploadIcon />
              </Button>
  
  
            </div>
            <aside>
              <h2 style={{ marginLeft: "3rem" }}>Course Details</h2>
              <ul>{files}</ul>
            </aside>
          </section> */}
          <div style={{ marginLeft: "3rem" }}>
            <form >
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                  fontSize: "18px",
                }}
              >
                  <label>Course Code* <small>{" "}(atleast two capital letter and two number)</small></label><br />
                  <input
                   required
                   autoFocus
                   maxLength={6}
                   value={courseCode}
                   onChange={(e)=>{setCourseCode(e.target.value)}}
                  />
                  <br />
                  <label>Course Name*</label><br />
                <input
                  fullWidth
                  required
                  autoFocus
                  label="Title of Course"
                  id="fullWidth"
                  style={{ fontSize: "18px" }}
                  value={courseTitle}
                  onChange={(e) => { setCourseTitle(e.target.value) }}
                />
                 <br />
              <label>Description*</label>
              <br />
  
              <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Description of Course"
                style={{ width: "100%", maxWidth: "900px", fontSize: "18px" }}
                required
                autoFocus
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <label>Course category*</label>
              <br />
              <select
              required
              autoFocus
                 value={courseCategory}
                 onChange={(e)=>{setCourseCategory(e.target.value)}}
              >
                  <option>Frontend stack</option>
                  <option>backend stack</option>
                  <option>fullstack</option>
                  <option>machine learning</option>
                  <option>reactjs</option>
                  <option>python</option>
                  <option>javascript</option>
                  <option>AI</option>
              </select>
              </Box>
              
              <div></div>
            </form>
          </div>
        </Dialog>
      </div>
    );
}
  //_------------------> dashboard section of dashboard page
  const Courses = (
    <>
      <div style={{ margin: "2rem" }}>
        {user.token && user.role === "Admin" ? createFolderButton() : ""}
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
              <div key={course._id}>
                <div className={classes.card}>
                    <img src={folderImg} style={{"width":"50px"}} alt="folder" />
                  <div className={classes.courseNaamm}>{course.courseCode}{" "}{course.courseName}</div>
                  <div>{course.courseCategory}</div>
                  <a href={`/dashboard/${course.courseCode}`}>
                    <button className={classes.viewCourseBtn} type="button">
                      Veiw Course <ArrowForwardIcon />
                    </button>
                  </a>
                </div>
              </div>
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

  //--------------> Coursess section of dashboard page
  const Coursess = (
      <UploadCourse />
  );

  const generateDashboardSection = () => {
    switch (dashboardSection[activvDashboardSection]) {
      case dashboardSection.dashboard:
        return Dashboard; //dashboard section
      case dashboardSection.courses:
        return Courses; //course section
      case dashboardSection.allpdf:
        return Coursess; //Coursess section
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
