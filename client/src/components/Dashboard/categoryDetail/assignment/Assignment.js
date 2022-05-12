import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../../../features/userSlice';
import { useSelector } from 'react-redux';
import classes from './assignment.module.css'
import axios from 'axios';
import AssignmentIcon from '@mui/icons-material/Assignment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: "600px",
  bgcolor: 'background.paper',
  border: '2px solid #efefef',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};
const Assignment = (props) => {
    const{module_id}=props;
  const user = useSelector(selectUser);
  let { course_code } = useParams();
  const [open, setOpen] = React.useState(false);
  const [assignmentsName, setAssignmentName] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [uploadBy, setUploadBy] = useState('Admin');
  const [submittedDate, setSubmittedDate] = useState('');
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(assignmentsName,remark,totalMarks,uploadBy,submittedDate,file);

  const onSubmit=()=>{
      const formData =new FormData();
      formData.append("courseCode",course_code);
      formData.append("moduleId",module_id);
      formData.append('assignmentName',assignmentsName);
      formData.append("totalMarks",totalMarks);
      formData.append('uploadedBy',uploadBy);
      formData.append('submissionDate',submittedDate);
      formData.append('remarks',remark);
      formData.append('file',file);

      axios.post('/admin/module-assignment',formData,{
        headers: {
            'content-type': 'multipart/form-data',
            authorization: `Bearer ${user.token}`,
          },
      }).then((response)=>{console.log(response.json())})

  }
  return (
    <div>
      <div>
        <button onClick={handleOpen} ><AssignmentIcon /> Create Assignment</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2' className={classes.createAssi}>
              Create Assignment
            </Typography>
            <form className={classes.formAssi}>
            <label>Assignment Name:</label>
            <br />
            <input
              placeholder='assignment name'
              required
              value={assignmentsName}
              onChange={(e) => {
                setAssignmentName(e.target.value);
              }}
            />
            <br />
            <label>Total Mark:</label>
            <input
              type={'number'}
              placeholder='marks'
              required
              value={totalMarks}
              onChange={(e) => {
                setTotalMarks(e.target.value);
              }}
            />
            <br />
            <label>Upload by:</label>
            <select
              required
              value={uploadBy}
              onChange={(e) => {
                setUploadBy(e.target.value);
              }}
            >
              <option>Admin</option>
            </select>
            <br />
            <label>Submition Date:</label>
            <input
              type={'date'}
              required
              placeholder='MM/DD/YYYY'
              value={submittedDate}
              onChange={(e) => {
                setSubmittedDate(e.target.value);
              }}
            />
            <br />
            <label>Remark:</label>
            <br />
            <textarea
              placeholder='Remark'
              required
              value={remark}
              onChange={(e) => {
                setRemark(e.target.value);
              }}
            ></textarea>
            <br />
            <label>Select Assignment File:</label>
            <input
              type={'file'}
              required
              value={file}
              onChange={(e) => {
                setFile(e.target.value);
              }}
            />
            <br />
            <br />
            <button onClick={()=>onSubmit()}>Upload</button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Assignment;
