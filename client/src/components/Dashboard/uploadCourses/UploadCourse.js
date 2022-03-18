import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const UploadCourse = () => {
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
      user: "",
      title: title,
      discribtion: discribtion,
      thumbnail: thumbnailImg,
      filePath: filePath,
    };
    console.log(coursData)
    axios.post("", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
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
      <form onSubmit={onSubmit}>
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
        <button type="submit" onSubmit={onSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default UploadCourse;
