import React, { Fragment, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';

const UserProfile = (props) => {
  const roles = props.roles;
  const onDrop=(files)=>{
     const formData=new FormData();
     const config={
         header:{'content-type':"multipart/form-data"}

     }
     console.log( files);
     formData.append("file",files[0]);
  }
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({onDrop});
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size}bytes
    </li>
  ));
  const profileItems = {
    Profile: "Profile",
    ProfileSetting: "Profile Setting",
    Lougout: "Logout",
  };
  const [activeSection, setActiveSection] = useState(
    Object.keys(profileItems)[0]
  );

  const ProfileSection = (
    <section>
      <div>
        <div>
          <img src="#" alt="profilepicture"></img>
        </div>
        <div>AYUSH TRIPATHI</div>
        <div>Student</div>
      </div> 
    </section>
  );
  const upload = (
  <div>
      <section>
          <div {...getRootProps()} style={{"width":"500px","height":"300px","border":"#acacac 2px dotted","display":"flex","justifyContent":"center"}}>
              <input {...getInputProps()} />
              <Button>upload vedio<UploadIcon /></Button>
          </div>
          <aside>
              <h2>vedios</h2>
              <ul>{files}</ul>
          </aside>
      </section>
  </div>
    );

  const generateActivePart = () => {
    switch (profileItems[activeSection]) {
      case profileItems.Profile:
        return ProfileSection;

      case profileItems.ProfileSetting:
        return ProfileSection;
      case profileItems.Lougout:
        return upload;

      default:
        return null;
    }
  };
  console.log(activeSection, "activesection");
  return (
    <div>
      <section>
        <div>
          <div>
            {Object.keys(profileItems)?.map((key) => (
              <div key={key} onClick={() => setActiveSection(key)}>
                {profileItems[key]}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>{generateActivePart()}</div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
