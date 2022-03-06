import React, {  useState } from "react";


const UserProfile = (props) => {
  const roles = props.roles;
  
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
  // const upload = (
  // <div>
      
  // </div>
  //   );

  const generateActivePart = () => {
    switch (profileItems[activeSection]) {
      case profileItems.Profile:
        return ProfileSection;

      case profileItems.ProfileSetting:
        return ProfileSection;
      case profileItems.Lougout:
        return ProfileSection;

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
