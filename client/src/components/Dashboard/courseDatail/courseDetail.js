import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { classNames, Worker } from '@react-pdf-viewer/core';
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
const CourseDetail = (props) => {
  const [items, setItems] = useState([]);
  console.log(items);
  const user = useSelector(selectUser);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const token = window.localStorage.getItem("token");
  // const role=window.localStorage.getItem("role");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  let { course_id } = useParams();
  console.log(course_id);
  useEffect(() => {
    axios
      .get(`/course-media/${course_id}`, {
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
  }, []);

  return (
    <>
      {user.token && user.role === 'Admin' ? <UploadVideos /> : ''}
      <h1 style={{marginTop:"-2rem",marginLeft:"1rem"}}>COURSE DETAIL OF COURSE CODE({course_id})</h1>
      <div>
        <section className={classes.fl}>
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
                  <p>{course.mediaFileName}</p>

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
