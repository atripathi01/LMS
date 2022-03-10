import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDropzone } from "react-dropzone";
import UploadIcon from "@mui/icons-material/Upload";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import classes from "./upoloadDialog.module.css";
import axios from "axios";
import { useState } from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [courseTitle, setCourseTitle] = React.useState("");
  const [discribtion, setDiscribtion] = React.useState("");
  // const [accessToken,setAccessToken]=React.useState("");


  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");


  const token = window.localStorage.getItem("token");
  // console.log(token, "localStorageToken");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const onDrop = (files) => {

    setFile(files[0]);
    setFileName(files[0].name);

    console.log(file);
    console.log(fileName);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    axios
      .post("/upload-one", formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            "authorization": `Bearer ${token}`,
          }
        })

      .then((response) => {
        console.log(response)
        console.log(response.data)
        if (response.data.status) {
          console.log("upload successful");
        } else {
          alert("failed");
        }
      });
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size}bytes
    </li>
  ));

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
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Upload Content (only video(in mp4 formate) & PDF is accepted )
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Publish
            </Button>
          </Toolbar>
        </AppBar>
        <section>
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
        </section>
        <div style={{ marginLeft: "3rem" }}>
          <section>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                fontSize: "18px",
              }}
            >
              <TextField
                fullWidth
                required
                autoFocus
                label="Title of Course"
                id="fullWidth"
                style={{ fontSize: "18px" }}
                value={courseTitle}
                onChange={(e) => { setCourseTitle(e.target.value) }}
              />
            </Box>
            <br />
            <br />
            <label>Discribtion</label>
            <br />

            <TextareaAutosize
              aria-label="minimum height"
              minRows={10}
              placeholder="Discribtion of Course"
              style={{ width: "100%", maxWidth: "900px", fontSize: "18px" }}
              required
              autoFocus
              value={discribtion}
              onChange={(e) => setDiscribtion(e.target.value)}
            />
            <div></div>
          </section>
        </div>
      </Dialog>
    </div>
  );
}
