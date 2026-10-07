

import React from 'react'
import { useParams } from 'react-router-dom'
import { trips } from '../../data/Trips'

const BookingForm = () => {

    const { id } = useParams()


    const selectedTrip = trips.find((t) => t.id === Number(id))

    return (
        <h1>BookingForm - {selectedTrip.name}</h1>
    )
}

export default BookingForm