import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import classes from './calendar.module.css';
import { selectUser } from '../../../features/userSlice';
import { useSelector } from 'react-redux';

// locale time set
const locales = {
  'en-in': require('date-fns/locale/en-IN'),
};

// localizer
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// event array (it is for testing only)
const events = [
  {
    title: 'bigMeet with Client',
    allDay: true,
    start: new Date(2022, 6, 0),
    end: new Date(2022, 6, 0),
  },
  {
    title: 'bigMeet with trainer',
    allDay: true,
    start: new Date(2022, 6, 2),
    end: new Date(2022, 6, 6),
  },
  {
    title: 'bigMeet with admin ',
    allDay: true,
    start: new Date(2022, 6, 22),
    end: new Date(2022, 6, 23),
  },
  {
    title: 'bigMeet with students',
    allDay: true,
    start: new Date(2022, 6, 30),
    end: new Date(2022, 7, 2),
  },
];

const CalendarPage = () => {
    const user = useSelector(selectUser);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={classes.CalendarP}>
      <h1>Calendar</h1>
       {user.token&& user.role==="Admin"?(<>
        <button
        onClick={() => setDrawerOpen(true)}
        className={classes.addEventModel}
      >
        Add Event
      </button>
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <Box width='250px' role='presentation' padding='5px'>
          <h3 className={classes.headTitle}>Add Event</h3>
          <br />
          <label className={classes.addEventLabels}>Event Name</label>
          <br />
          <input
            className={classes.addEventInputbox}
            placeholder='Enter event Title'
            type='text'
            value={newEvent.title}
            onChange={(e) => {
              setNewEvent({ title: e.target.value });
            }}
          />
          <br />
          <label className={classes.addEventLabels}>Start Date</label>
          <br />
          <DatePicker
            className={classes.addEventInputbox}
            placeholderText='Start Date'
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ start: start })}
          />
          <br />
          <label className={classes.addEventLabels}>End Date</label>
          <br />
          <DatePicker
            className={classes.addEventInputbox}
            placeholderText='End Date'
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ end: end })}
          />
          <br />
          <button style={{background:"blue",color:"white", padding:"0.5rem 0.8rem"}} className={classes.addEventButton} onClick={()=>setDrawerOpen(false)}>Add </button>
          <br />
        </Box>
      </Drawer>
       </>):("")}

      <div>
        <Calendar
          localizer={localizer}
            events={events}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 450, marginLeft: '20px', marginRight: '20px' }}
        ></Calendar>
      </div>
    </div>
  );
};

export default CalendarPage;
