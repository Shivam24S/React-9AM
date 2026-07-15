import React from 'react'

import { Table } from 'react-bootstrap'

import students from '../../utils/dummyStudent'
import StudentList from './StudentList'

const Student = () => {
  return (

    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Phone no</th>
          <th>Course</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s,index) => {

          return (
            <StudentList student={s} key={s.id} index={index} />
          )
        })}
      </tbody>
    </Table>



  )
}

export default Student