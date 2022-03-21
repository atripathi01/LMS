import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
// import  { useDropzone } from "react-dropzone";
// import UploadIcon from "@mui/icons-material/Upload";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import classes from "./upoloadDialog.module.css";
// import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { DASH_BOARD } from "../../constants/pathContainer";
import {selectUser} from '../../features/userSlice'
import {useSelector} from 'react-redux'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function FullScreenDialog() {
    const user=useSelector(selectUser);
  const [open, setOpen] = React.useState(false);
  const [courseCode, setCourseCode] = React.useState("");
  const [courseTitle, setCourseTitle] = React.useState("");
  const [courseCategory, setCourseCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [items,setItems]=useState("");



//   const [file, setFile] = useState();
//   const [fileName, setFileName] = useState("");


//   const token = window.localStorage.getItem("token");
  // console.log(token, "localStorageToken");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    Navigate(DASH_BOARD)
  };


  const onDrop = (files) => {

    // setFile(files[0]);
    // setFileName(files[0].name);

    // console.log(file);
    // console.log(fileName);
    
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("fileName", files[0].name);
    fetch("/upload-one", formData,
        {
            method:"POST",
          headers: {
            "content-type": "multipart/form-data",
            "authorization": `Bearer ${user.token}`,
          }
        })

      .then((response) => {
        console.log(response)
        console.log(response.data)
        if (response.data.status) {
          console.log("upload successful");
        } else {
          window.alert("failed");
        }
      });
  };

  // using Dropzone library for upload files for the system 

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size}bytes
    </li>
  ));
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
       }).then((response)=>{
           return response.json();

       }).then((res)=>{
           console.log(res);
           setItems(res.course);
           handleClickClose();
       })

    //    handleClickClose();
  }

  return (
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
        open={open}
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
