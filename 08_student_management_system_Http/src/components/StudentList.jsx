import React from "react";

import { Button } from "react-bootstrap";
// import { deleteStudent } from "../api/studentFetch";
import { deleteStudent } from "../api/studentAxios";
import { useNavigate } from "react-router-dom";

const StudentList = ({ student, index }) => {

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteStudent(student._id);


    alert("student Deleted");
  };


  const handleEdit = () => {


    navigate("/editStudentData", { state: student })


  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{student.firstName}</td>
      <td>{student.lastName}</td>
      <td>{student.email}</td>
      <td>{student.phoneNumber}</td>
      <td>{student.course}</td>
      <td className="d-flex gap-4">
        {<Button variant="warning" onClick={handleEdit}  >Edit</Button>}
        {
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        }
      </td>
    </tr>
  );
};

export default StudentList;
