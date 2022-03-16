import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CourseDetail = (props) => {
    // const [items, setItems] = useState([]);
  
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    // const token = window.localStorage.getItem("token");
    // const role=window.localStorage.getItem("role");
    // // const defaultLayoutPluginInstance = defaultLayoutPlugin();
    // const vedioId=props.match.params.course_id;
    // console.log(vedioId,"najd");
    // useEffect(() => {
    //     axios
    //       .post("/get-all-file")
    //       .then((response) => {
    //         if (response.status === 200) {
    //           console.log("fetched", response.data);
    //           setItems(response.data.mediaData);
    //         } else {
    //           console.log("failed fetch");
    //         }
    //       })
    //       .catch((err) => {
    //         console.log("error", err);
    //       });
    //   }, []);
      // const id = props.match.params.course_id;
      // console.log(id);
     let{course_id}=useParams();
     console.log(course_id);
  return (
    <h1>
        courseDetail of {course_id}
    </h1>
  )
}

export default CourseDetail