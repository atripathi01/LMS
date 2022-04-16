import React, { useState } from 'react';
import Modal from 'react-modal';
import { selectUser } from '../../../features/userSlice';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import classes from './courseDetail.module.css';
import axios from 'axios';
import FileUploadIcon from '@mui/icons-material/FileUpload';

/////////////////////////////////////////////////////////////////////////////
//        Upload Video and PDF content on Course PopUp  Page               //
/////////////////////////////////////////////////////////////////////////////

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

const UploadVideos = ({getAllMedia}) => {
    
  // fetch user data from redux
  const user = useSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);

  // split course Code from url by using params
  let { course_id } = useParams();

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

  // onDrop funtion - when user select the file for our system after selecting the file will automatically upload..

  const onDrop = (files) => {
    console.log('ho');

    // append formData
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('fileName', files[0].name);
    formData.append('courseCode', course_id);

    // console.log('form appended data -> ')
    // console.log(Object.fromEntries(formData))

    // POST api for uplaoding the files
    axios
      .post('/admin/upload-course-media', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((responses) => {
        console.log(responses);
        if (responses) {
          setIsOpen(false);
          console.log('upload successful');
          getAllMedia();
        } else {
          window.alert('failed');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // using Dropzone library for upload files for the system
  const {
    //   acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
  });

  //-------------------------> checking the uplaod file list on screen
  //   const files = acceptedFiles.map((file) => (
  //     <li key={file.path}>
  //       {file.path} - {file.size}bytes
  //     </li>
  //   ));
  //   //   console.log(files);

  return (
    <div className={classes.uploadCont}>
      <div className={classes.lef}>
        <button className={classes.uplo} onClick={openModal}>
         <FileUploadIcon /> Upload
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
          UPLOAD VIDEOS OR PDF'S
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
            <button className={classes.upl}>Upload File</button>
          </div>
        </div>

        <button onClick={closeModal} className={classes.cancelbtn}>
          Cancel
        </button>
      </Modal>
    </div>
  );
        
};

export default UploadVideos;
