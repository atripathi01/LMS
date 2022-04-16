import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import VideoPlayer from 'react-video-js-player';
import UploadVideos from './uploadVideos';
import { selectUser } from '../../../features/userSlice';
import { useSelector } from 'react-redux';
import pdfim from '../../images/pdf.png'
import classes from './courseDetail.module.css';


///////////////////////////////////////////////////////////////////////////////////////
///          COURSE DETAIL PAGE WHERE CONTENT RELATED TO COURSE ARE AVAIABLE      /////
///////////////////////////////////////////////////////////////////////////////////////


const CourseDetail = (props) => {

  //  ----------intailise states
  const [items, setItems] = useState([]);

  // fetch user data from redux 
  const user = useSelector(selectUser);


  const [open, setOpen] = React.useState(false);

  // handle toogle for open and close for PDF views popup
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // default layout
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // split course code from url using params
  let { course_id } = useParams();

  function getAllMedia(){
       // GET api for fetching video and pdf of perticular course 
   fetch(`/course-media/${course_id}`, {
       method:"GET",
      headers: {
        'content-type': 'multipart/form-data',
        authorization: `Bearer ${user.token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('fetched', response.data);
        setItems(response.data.courseMedia);
      } else {
        console.log('failed fetch');
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
  }

  //useEffect
   
  useEffect(() => {
   getAllMedia();
   
  }, []);


  return (
    <>
     
      {/*       Button of uplaod video or PDF file inside the course        */}

      {user.token && user.role === 'Admin' ? <UploadVideos getAllMedia={getAllMedia}/> : ''}

      <h1 style={{marginTop:"",marginLeft:"1rem"}}>COURSE DETAIL OF COURSE CODE({course_id})</h1>
      
      <div>
        <section className={classes.fl}>
           {/* mapping course items */}
          {items.map((course) => (
            <div>
              {course.mediaType === 'mp4' ? (
                // ------------------ mp4 video player ---------------
                <div style={{ margin: '2rem' }} key={course._id}>
                  {/* ---------------vedio player---------------- */}
                  <VideoPlayer
                    src={`http://localhost:5000/uploads/${course.mediaFileName}`}
                    width='300px'
                    height='250px'
                    playbackRates={[0.5, 1, 1.5, 2]}
                  ></VideoPlayer>
                  <p>{course.mediaFileName}</p>
                </div>
              ) : (
                // ------------------ pdf viewer model user -----------------
                <div style={{ margin: '2rem' }}>
                  <button
                    style={{
                      width: '320px',
                      height: '250px',
                      fontSize: '65px',
                    }}
                    onClick={handleOpen}
                    className={classes.bnn}
                  >
                    <img
                      src={pdfim}
                      alt='pdf'
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </button>
                  

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 700,
                        height: '80vh',
                      }}
                      key={course._id}
                    >
                      {/* -------------pdf viewer------------ */}
                      <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js'>
                        <Viewer
                          fileUrl={`http://localhost:5000/uploads/${course.mediaFileName}`}
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
  );
};

export default CourseDetail;
