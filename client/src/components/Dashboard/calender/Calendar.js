import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-datepicker/dist/react-datepicker.css';

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
// const events = [
//   {
//     title: 'bigMeet with Client',
//     allDay: true,
//     start: new Date(2022, 6, 0),
//     end: new Date(2022, 6, 0),
//   },
//   {
//     title: 'bigMeet with trainer',
//     allDay: true,
//     start: new Date(2022, 6, 2),
//     end: new Date(2022, 6, 6),
//   },
//   {
//     title: 'bigMeet with admin ',
//     allDay: true,
//     start: new Date(2022, 6, 22),
//     end: new Date(2022, 6, 23),
//   },
//   {
//     title: 'bigMeet with students',
//     allDay: true,
//     start: new Date(2022, 6, 30),
//     end: new Date(2022, 7, 2),
//   },
// ];


const CalendarPage = () => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
  });
//   console.log(newEvent.title,newEvent.start,newEvent.end)

  return (
    <div>
      <h1>Calendar</h1>
      {/* <Popup contentStyle={{width: "350px",height:"350px"}} trigger={<button> Trigger</button>} position="right center">
    <div>
        <input />
        <input />
        <input />

    </div>
  </Popup> */}
      <div style={{display:"none"}}>
        <h2>Add new event</h2>
        <div>
          <input
            placeholder='Enter event Title'
            type='text'
            value={newEvent.title}
            onChange={(e) => {
              setNewEvent({ title: e.target.value });
            }}
          />
          <DatePicker
            placeholderText='Start Date'
            selected={newEvent.start}
            onChange={(start) => setNewEvent({start:start})}
          />
          <DatePicker
            placeholderText='End Date'
            selected={newEvent.end}
            onChange={(end) => setNewEvent({end:end})}
          />
          <button>Add Event</button>
        </div>
      </div>
      <div>
        <Calendar
          localizer={localizer}
        //   events={events}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 450,"marginLeft":"20px","marginRight":"20px" }}
        ></Calendar>
      </div>
    </div>
  );
};

export default CalendarPage;
