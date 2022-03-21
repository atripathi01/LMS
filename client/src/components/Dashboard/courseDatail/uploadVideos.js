import React, { useState } from 'react';
import Modal from 'react-modal';
import { selectUser } from '../../../features/userSlice';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import classes from './courseDetail.module.css';
import axios from 'axios';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const UploadVideos = () => {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [mediaDescription, setMediaDescription] = useState('');
  // console.log(mediaDescription);
  let { course_id } = useParams();
  console.log(course_id);
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onDrop = (files) => {
    console.log('ho');
    // setFile(files[0]);
    // setFileName(files[0].name);

    // console.log(file);
    // console.log(fileName);

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('fileName', files[0].name);
    formData.append('courseCode', course_id);
    // formData.append("description",mediaDescription);
    // console.log(files[0], files[0].name, course_id);
    // const data={
    //     courseCode:course_id,
    //    description:mediaDescription,
    // }

    console.log('form appended data -> ');
    console.log(Object.fromEntries(formData));
    axios
      .post('/admin/upload-course-media', formData, {
        // method:"POST",
        headers: {
          'content-type': 'multipart/form-data',
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        return response;
      })
    // console.log(files[0])
    // console.log(files[0].name)
    // console.log(course_id)
    console.log('form appended data -> ')
    console.log(Object.fromEntries(formData))
    
    axios.post("/admin/upload-course-media", formData,
        {
            // method:"POST",
          headers: {
            "content-type": "multipart/form-data",
            "authorization": `Bearer ${user.token}`,
          },
        
        })
       .then((response)=>{return response})
      .then((responses) => {
        console.log(responses);
        if (responses) {
          setIsOpen(false);
          console.log('upload successful');
        } else {
          window.alert('failed');
        }
      }).catch(err => {
        console.log(err);
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
  //   console.log(files);
  return (
    <div className={classes.uploadCont}>
      <div className={classes.lef}>
        <button  className={classes.uplo} onClick={openModal}>
          Upload content
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          UPLOAD VIDEOS OR PDF'S{' '}
          <small>(only accepted mp4 and pdf files)</small>
        </h2>
        <div>
          <div
            {...getRootProps()}
            style={{
              width: '100%',
              height: '300px',
              border: '#acacac 2px dotted',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <input {...getInputProps()} />
            <button className={classes.upl}>upload video</button>
          </div>
        </div>

        <button onClick={closeModal} className={classes.cancelbtn}>Cancel</button>
      </Modal>
    </div>
  );
};

export default UploadVideos;
