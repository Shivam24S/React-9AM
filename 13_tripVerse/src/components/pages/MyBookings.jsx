import { useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { authContext } from "../../context/AuthContext";
import { query, getDocs, collection, where, orderBy } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    console.log("bookings", bookings);

    const { user } = useContext(authContext);

    const navigate = useNavigate();



    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchBookings = async () => {
            try {
                const q = query(
                    collection(db, "bookings"),
                    where("userId", "==", user.uid),
                    orderBy("createdAt", "desc"),
                );

                const querySnapshot = await getDocs(q);

                const bookingsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setBookings(bookingsData);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [user]);

    return (
        <>
            {bookings.length === 0 ? (
                <>
                    <p>No bookings found.</p>

                    <br />

                    <p>Do you want to book a trip now?</p>

                    <button onClick={() => navigate("/trips")}>Book Now</button>
                </>
            ) : (
                <div>
                    {bookings.map((booking) => (
                        <Card
                            key={booking.id}
                            style={{ width: "18rem", marginBottom: "1rem" }}
                        >
                            <Card.Img variant="top" src={booking.image} />
                            <Card.Body>
                                <Card.Title>{booking.tripName}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
};

export default MyBookings;
