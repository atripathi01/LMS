import React,{useState} from 'react'
import Modal from 'react-modal';
import { selectUser } from '../../../features/userSlice';
import {useSelector} from 'react-redux'
import  { useDropzone } from "react-dropzone";
import { useParams } from 'react-router-dom'
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
    const user=useSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false);
    const [mediaDescription, setMediaDescription]=useState("");
    console.log(mediaDescription);
    let{course_id}=useParams();
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

    // setFile(files[0]);
    // setFileName(files[0].name);

    // console.log(file);
    // console.log(fileName);
    
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("fileName", files[0].name);
    const data={
        courseCode:course_id,
       description:mediaDescription,
    }
    fetch("/admin/upload-course-media", formData,
        {
            method:"POST",
          headers: {
            "content-type": "multipart/form-data",
            "authorization": `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
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
  return (
    <div>
         <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>UPLOAD VIDEOS OR PDF'S <small>(only accepted mp4 and pdf files)</small></h2>
         <div>
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
            <button>
              upload video
             
            </button>


          </div>
          <div>
           <textarea placeholder='description' onChange={(e)=>setMediaDescription(e.target.value)}></textarea>
             </div>
         </div>
       
        <button onClick={closeModal}>Cancel</button>
        <button onClick={closeModal}>Upload</button>
       
      </Modal>
    </div>
  )
}

export default UploadVideos