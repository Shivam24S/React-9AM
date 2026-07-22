import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import * as formik from "formik";

// import studentValidationSchema from "../validation/studentValidation";

// import { updateStudent } from "../api/studentFetch";
import { updateStudent } from "../api/studentAxios";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

function EditStudent() {
  const { Formik } = formik;

  const navigate = useNavigate();


  const { state } = useLocation();

  const studentId = state._id

  return (
    <Formik
      validationSchema={""}
      onSubmit={(values, { resetForm }) => {
       

        updateStudent(studentId,values);

        alert("student data updated successfully");

        navigate("/");

        resetForm();
      }}
      initialValues={{
        firstName: state.firstName || "",
        lastName: state.lastName || "",
        phoneNumber: state.phoneNumber || "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>phoneNumber</Form.Label>
              <Form.Control
                type="text"
                placeholder="phoneNumber"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                isInvalid={!!errors.phoneNumber}
              />

              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit">update</Button>
        </Form>
      )}
    </Formik>
  );
}

export default EditStudent;
