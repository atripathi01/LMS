import React, { useState } from 'react';
import Modal from 'react-modal';
import { selectUser } from '../../../features/userSlice';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import classes from './courseDetail.module.css';
// import axios from 'axios';
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

const UploadVideos = (props) => {

    const {
        moduleName,
        courseCode,
        module_id, 
    }=props;
    
  // fetch user data from redux
  const user = useSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState('');


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

  const onSubmitedupload = (files) => {
    console.log('ho');

    // append formData
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('fileName', files[0].name);
    formData.append('courseCode',courseCode);
    formData.append('moduleId',module_id);
    formData.append('title',title);
    formData.append('description',description);
    


    // console.log('form appended data -> ')
    // console.log(Object.fromEntries(formData))

    // POST api for uplaoding the files
    fetch('/admin/upload-course-media', formData, {
        method:"POST",
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
          closeModal();
       
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
      acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone(onSubmitedupload);

//   -------------------------> checking the uplaod file list on screen
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size}bytes
      </li>
    ));
    //   console.log(files);

  return (
    <div className={classes.uploadCont}>
      <div >
        <button  onClick={openModal} >
         <FileUploadIcon /> Upload videos and pdf
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
          Upload file on Module
          <small>(only accepted mp4 and pdf files)</small>
        </h2>
        <div>
         <form>
             <label>Title:</label><br />
             <input placeholder='title of content' required value={title} onChange={(e)=>{setTitle(e.target.value)}} /><br />
            
             <label>Description:</label><br />
             <textarea placeholder='title of content' required value={description} onChange={(e)=>{setDescription(e.target.value)}} /><br />
        {files.length>0 ?(<>
        <label>File:</label><br />
        <ul>{files}</ul><br /><br />
        <button  onClick={(files)=>onSubmitedupload(files)}>Submit</button>


        </>) :(<><div
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
          </div></>)}
          
          </form> 
        </div>


        <button onClick={closeModal} >
          Cancel
        </button>
        
      </Modal>
    </div>
  );
        
};

export default UploadVideos;
