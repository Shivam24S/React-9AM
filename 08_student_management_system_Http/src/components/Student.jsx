// hooks
import React, { useEffect, useState } from "react";

// components
import StudentList from "./StudentList";

// react-bootstrap components
import { Table } from "react-bootstrap";
import { Spinner, Alert } from "react-bootstrap";

// import { getStudent } from "../api/studentFetch";
import { getStudent } from "../api/studentAxios";



const Student = () => {
  const [studentData, setStudentData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const data = await getStudent();

      console.log("Data", data);

      setStudentData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-auto">
        <div>{error.message || String(error)}</div>
      </Alert>
    );
  }

  console.log("student data", studentData);

  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>id</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Phone no</th>
          <th>Course</th>
          <th colSpan={2} >Action</th>
        </tr>
      </thead>
      <tbody>
        {studentData.map((s, index) => {
          return <StudentList student={s} key={s.id} index={index} />;
        })}
      </tbody>
    </Table>
  );
};

export default Student;
