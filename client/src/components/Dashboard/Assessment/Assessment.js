import React from 'react'
import classes from './assessment.module.css';

const Assessment = () => {
  return (
      <>
      <div style={{height:"3.5rem"}}></div>
      <section style={{marginLeft:"250px"}}>
    <div>
        <form className={classes.marksForm}>
            <div>
                <label>Student Name:</label> <br />
                <input type='text' placeholder='name' required  />
            </div>
            <div>
                <label>Marks:</label><br />
                <input type={'number'} placeholder='marks' required  />
            </div>
            <div>
                <label>Total Marks</label><br />
                <input type={'number'} placeholder='out of marks' required  />
            </div>
            <div>
                <label>Date</label><br />
                <input type={'date'} placeholder='date' required  />
            </div>
            
        </form>
    </div>
    <div className={classes.marksDetailSection}>
    <table
            style={{ textAlign: 'left' }}
            className={classes.marksDetail}
          >
            <tr className={classes.marksTableHead}>
              <th>Student Name</th>
              <th>Marks</th>
              <th>Total Marks</th>
              <th>Date</th>
              
            </tr>
            
              <tr className={classes.marksTable}>
                <td>Ayush Tripathi</td>
                <td>52</td>
                <td>100</td>
                <td>15-07-2022</td>
              
              </tr>
          
          </table>
    </div>
    </section>

    </>
  )
}

export default Assessment