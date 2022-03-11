import React, { useEffect, useState } from "react";
import UploadContentDialog from "./UploadContentDialog";
import classes from "./dashboard.module.css";
import axios from "axios";
import { Player } from "video-react";

const Dashboard = (props) => {
  const dashboardSection = props.dashboardSection;
  const [items, setItems] = useState([]);
  const [activvDashboardSection, setActiveDashboardSection] = useState(
    Object.keys(dashboardSection)[0]
  );

  const token = window.localStorage.getItem("token");
  console.log(token);
  console.log(items);
  useEffect(() => {
    axios
      .post("/get-all-file")
      .then((response) => {
        if (response.status === 200) {
          console.log("fetched", response.data.mediaData);
          setItems(response.data.mediaData);
        } else {
          console.log("failed fetch");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const Dashboard = (
    <>
      <div>
        <UploadContentDialog />
      </div>
      <section>
        <div>
          <h1>Dashboard</h1>
          <div>
           
            {items.map((vedios) => (
              <div>
                {console.log("chal bhai")}
                <Player>
                  <source
                    src={`http://localhost:5000/uploads/${vedios.courseMedia}`}
                  />
                </Player>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
  const Courses = <h1>Courses</h1>;
  const PDFs = <h1>PDFS</h1>;

  const generateDashboardSection = () => {
    switch (dashboardSection[activvDashboardSection]) {
      case dashboardSection.dashboard:
        return Dashboard;
      case dashboardSection.courses:
        return Courses;
      case dashboardSection.allpdf:
        return PDFs;
      default:
        return null;
    }
  };

  return (
    <>
      <section className={classes.dash}>
        <div className={classes.dashNav}>
          {Object.keys(dashboardSection)?.map((key) => (
            <div
              className={`${classes.dashboardItems} ${
                activvDashboardSection === key ? classes.activeDash : " "
              }`}
              key={key}
              onClick={() => setActiveDashboardSection(key)}
            >
              {dashboardSection[key]}
            </div>
          ))}
        </div>
        <div className={classes.dashItemDetail}>
          {generateDashboardSection()}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
