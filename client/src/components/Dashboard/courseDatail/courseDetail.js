import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import VideoPlayer from "react-video-js-player";


const CourseDetail = (props) => {
    const [items, setItems] = useState([]);
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const token = window.localStorage.getItem("token");
    const role=window.localStorage.getItem("role");
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
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
  
     let{course_id}=useParams();
     console.log(course_id);
  return (<>
    <h1>
        courseDetail of {course_id}
    </h1>
    <div>
      <section>
        <h1>Course Name</h1>
        {items.map((course) => (
        <div>
               {course.mediaType === "mp4" ? (

                  // ------------------ mp4 video player ---------------
                 <div style={{margin:"2rem"}}>
                   {/* ---------------vedio player---------------- */}
                  <VideoPlayer
                    src={`http://localhost:5000/uploads/${course.courseMedia}`}
                    width="300px"
                    height="250px"
                    playbackRates={[0.5, 1, 1.5, 2]}
                  ></VideoPlayer>
                  </div>
                ) : (
                  // ------------------ pdf viewer model user -----------------
                  <div style={{margin:"2rem"}}>
                    <button style={{width:'320px',height:"250px",fontSize:"65px"}} onClick={handleOpen}>
                    <img scr="../images/pdf.png" alt="pdf" style={{width:"100px",height:"auto"}} />
                    </button>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 700,
                          height: "80vh",
                        }}
                      >

                        {/* -------------pdf viewer------------ */}
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                          <Viewer
                            fileUrl={`http://localhost:5000/uploads/${course.courseMedia}`}
                            plugins={[defaultLayoutPluginInstance]}
                          />
                        </Worker>
                      </Box>
                    </Modal>
                  </div>
                )}
              </div>
              ))}
      </section>
    </div>
    </>
  )
}

export default CourseDetail