import { useNavigate, useParams } from "react-router-dom";
import { trips } from "../../data/Trips";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";

import { db } from "../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const BookingForm = () => {
  const { user } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: user.displayName,
    email: user.email,
    phone: "",
    date: "",
    person: 1,
    total: "",
    request: "",
  });

  const { id } = useParams();

  const selectedTrip = trips.find((t) => t.id === Number(id));

  const navigate = useNavigate();

  const handleChange = (field, e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        total: selectedTrip.price * formData.person,
      };
    });
  }, [formData.person, selectedTrip]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        person: formData.person,
        total: formData.total,
        request: formData.request,
        tripId: selectedTrip.id,
        tripName: selectedTrip.name,
        tripPrice: selectedTrip.price,
        createdAt: serverTimestamp()
      });

      alert("trip booked successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        person: 1,
        total: "",
        request: "",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={5} className="mt-5">
          <Card className="shadow rounded-5">
            <Card.Img
              variant="top"
              className="rounded-5 img-fluid"
              style={{ maxHeight: "400px" }}
              src={selectedTrip.image}
            />
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title className="fs-3">{selectedTrip.name} </Card.Title>
              <Card.Text>{selectedTrip.duration}</Card.Text>
              <Badge bg="success">
                {" "}
                <h3> ₹ {selectedTrip.price}</h3>{" "}
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7}>
          <Card className="mt-5">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Traveler Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Travel Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange("date", e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>No of Person</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.person}
                        onChange={(e) => handleChange("person", e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2">
                      <Form.Label>Grand Total</Form.Label>
                      <Form.Control value={formData.total} readOnly />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-2">
                      <Form.Label>Special Request</Form.Label>
                      <Form.Control
                        value={formData.request}
                        onChange={(e) => handleChange("request", e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-3 mt-4">
                  <Button onClick={() => navigate(-1)}>Back to Trips</Button>
                  <Button variant="primary" type="submit">
                    Confirm Booking
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;


// import { useNavigate, useParams } from "react-router-dom";
// import { trips } from "../../data/Trips";

// import {
//   Badge,
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   Row,
// } from "react-bootstrap";

// import { useContext, useEffect, useState } from "react";
// import { authContext } from "../../context/AuthContext";

// import { db } from "../../config/firebase";
// import {
//   addDoc,
//   collection,
//   serverTimestamp,
// } from "firebase/firestore";

// const BookingForm = () => {
//   const { user, loading } = useContext(authContext);

//   const { id } = useParams();

//   const selectedTrip = trips.find(
//     (t) => t.id === Number(id)
//   );

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     date: "",
//     person: 1,
//     total: 0,
//     request: "",
//   });

//   // Set user data after Firebase user is available
//   useEffect(() => {
//     if (user) {
//       setFormData((prev) => ({
//         ...prev,
//         name: user.displayName || "",
//         email: user.email || "",
//       }));
//     }
//   }, [user]);

//   // Calculate total
//   useEffect(() => {
//     if (selectedTrip) {
//       setFormData((prev) => ({
//         ...prev,
//         total: selectedTrip.price * Number(prev.person),
//       }));
//     }
//   }, [formData.person, selectedTrip]);

//   const handleChange = (field, e) => {
//     const value =
//       field === "person"
//         ? Number(e.target.value)
//         : e.target.value;

//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check login
//     if (!user) {
//       alert("Please login first");
//       return;
//     }

//     // Check trip
//     if (!selectedTrip) {
//       alert("Trip not found");
//       return;
//     }

//     try {
//       console.log("formData:", formData);

//       const bookingData = {
//         userId: user.uid,
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         date: formData.date,
//         person: Number(formData.person),
//         total: Number(formData.total),
//         request: formData.request,
//         tripId: selectedTrip.id,
//         tripName: selectedTrip.name,
//         tripPrice: selectedTrip.price,
//         createdAt: serverTimestamp(),
//       };

//       console.log("Booking data:", bookingData);

//       const docRef = await addDoc(
//         collection(db, "bookings"),
//         bookingData
//       );

//       console.log("Booking added successfully:", docRef.id);

//       alert("Trip booked successfully!");

//       setFormData({
//         name: user.displayName || "",
//         email: user.email || "",
//         phone: "",
//         date: "",
//         person: 1,
//         total: selectedTrip.price,
//         request: "",
//       });

//       // navigate("/");
//     } catch (error) {
//       console.error("Firestore booking error:", error);
//       alert(`Booking failed: ${error.message}`);
//     }
//   };

//   // Auth still loading
//   if (loading) {
//     return <h3>Loading user...</h3>;
//   }

//   // User not logged in
//   if (!user) {
//     return <h3>Please login to book a trip.</h3>;
//   }

//   // Trip not found
//   if (!selectedTrip) {
//     return <h3>Trip not found.</h3>;
//   }

//   return (
//     <Container>
//       <Row>
//         <Col md={5} className="mt-5">
//           <Card className="shadow rounded-5">
//             <Card.Img
//               variant="top"
//               className="rounded-5 img-fluid"
//               style={{ maxHeight: "400px" }}
//               src={selectedTrip.image}
//             />

//             <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//               <Card.Title className="fs-3">
//                 {selectedTrip.name}
//               </Card.Title>

//               <Card.Text>
//                 {selectedTrip.duration}
//               </Card.Text>

//               <Badge bg="success">
//                 <h3>₹ {selectedTrip.price}</h3>
//               </Badge>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={7}>
//           <Card className="mt-5">
//             <Card.Body>
//               <Form onSubmit={handleSubmit}>

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-2">
//                       <Form.Label>
//                         Traveler Name
//                       </Form.Label>

//                       <Form.Control
//                         type="text"
//                         value={formData.name}
//                         onChange={(e) =>
//                           handleChange("name", e)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-2">
//                       <Form.Label>
//                         Email
//                       </Form.Label>

//                       <Form.Control
//                         type="email"
//                         value={formData.email}
//                         onChange={(e) =>
//                           handleChange("email", e)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-2">
//                       <Form.Label>
//                         Phone Number
//                       </Form.Label>

//                       <Form.Control
//                         type="tel"
//                         value={formData.phone}
//                         onChange={(e) =>
//                           handleChange("phone", e)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-2">
//                       <Form.Label>
//                         Travel Date
//                       </Form.Label>

//                       <Form.Control
//                         type="date"
//                         value={formData.date}
//                         onChange={(e) =>
//                           handleChange("date", e)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-2">
//                       <Form.Label>
//                         No of Person
//                       </Form.Label>

//                       <Form.Control
//                         type="number"
//                         min="1"
//                         value={formData.person}
//                         onChange={(e) =>
//                           handleChange("person", e)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-2">
//                       <Form.Label>
//                         Grand Total
//                       </Form.Label>

//                       <Form.Control
//                         value={formData.total}
//                         readOnly
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={12}>
//                     <Form.Group className="mb-2">
//                       <Form.Label>
//                         Special Request
//                       </Form.Label>

//                       <Form.Control
//                         value={formData.request}
//                         onChange={(e) =>
//                           handleChange("request", e)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <div className="d-flex gap-3 mt-4">
//                   <Button
//                     type="button"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back to Trips
//                   </Button>

//                   <Button
//                     variant="primary"
//                     type="submit"
//                   >
//                     Confirm Booking
//                   </Button>
//                 </div>

//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default BookingForm;