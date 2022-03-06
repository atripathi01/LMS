import React, { useState } from 'react'
import UploadContentDialog from './UploadContentDialog'
import classes from './dashboard.module.css'


const Dashboard=(props)=> {
  const dashboardSection =props.dashboardSection;
   const [activvDashboardSection,setActiveDashboardSection]=useState(Object.keys(dashboardSection)[0]);

   const Dashboard=(
     <h1>Dashboard</h1>
   );
   const Courses=(
     <h1>Courses</h1>
   );
   const PDFs=(
     <h1>PDFS</h1>
   );

   const generateDashboardSection=()=>{
        switch(dashboardSection[activvDashboardSection])
       { case dashboardSection.dashboard:
        return Dashboard;
        case dashboardSection.courses:
          return Courses;
          case dashboardSection.allpdf:
            return PDFs;
            default:return null;
   };
  }
  
    return (<>
      <div style={{display:"none"}}><UploadContentDialog />
      </div>
      
      <section>
        <div>
            {Object.keys(dashboardSection)?.map((key)=>(
              <div  className={`${classes.dashboardItems} ${
                activvDashboardSection===key? classes.activeDash:" " }`}
                key={key}
                onClick={()=>setActiveDashboardSection(key)}  >
               { dashboardSection[key]}
              </div>
            ))}
        </div>
        <div>
         {generateDashboardSection()}
        </div>
      </section>
      </>

    )
  
}

export default Dashboard