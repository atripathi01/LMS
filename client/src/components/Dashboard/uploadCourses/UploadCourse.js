import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { selectUser } from "../../../features/userSlice"; 
import {useSelector} from 'react-redux'

const UploadCourse = () => {
    const user=useSelector(selectUser);
  const [filePath, setFilePath] = useState("");
  const [title, setTitle] = useState();
  const [discribtion, setDiscribtion] = useState();
  const [catagory, setCatagory] = useState();
  const [thumbnailImg, setThumbnailImg] = useState();
  const token = window.localStorage.getItem("token");
  console.log(filePath, "up");
  const onSubmit = (event) => {
    event.preventDefault();
    const coursData = {
      courseName: user.name,
      title: title,
      discription: discribtion,
      thumbnail: thumbnailImg,
      courseCode:"CDn454",
      courseCatagory:"yuwebfs",
      duration:"51:23"
      
    };
    // console.log(user.token)
    const tk=user.token;
    fetch("/admin/create-course", {
        method:"POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${tk}`,
      },
      body:JSON.stringify(coursData),
    }).then((response)=>{
        if(response.data===200){
          console.log("success")
        }else{
          window.alert("failed send")
        }
    })
  };
  const onDrop = (files) => {
    let formData = new FormData();

    formData.append("file", files[0]);
    console.log(files[0]);
    axios
      .post("/upload-one", formData, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.data.status) {
          console.log("upload successful");
          setFilePath("");
        } else {
          window.alert("failed");
        }
      });
  };
  return (
    <div>
      {" "}
      <form onSubmit={user.role==="Admin" && onSubmit}>
        <div>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button>upload course video</button>
              </div>
            )}
          </Dropzone>
          {/* {thumbnail !==""&&<div>
        <img src={``} alt="thumbnail" />
        </div>} */}
        </div>
        <div>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="discribtion"
            value={discribtion}
            onChange={(e) => setDiscribtion(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="catagory"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            placeholder="thumbnail"
            value={thumbnailImg}
            onChange={(e) => setThumbnailImg(e.target.value)}
          />
        </div>
        <button type="submit" onSubmit={user.role==='Admin'&& onSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default UploadCourse;
