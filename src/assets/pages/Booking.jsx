import React from 'react'
import RestaurantInfo from '../components/Booking/RestaurantInfo';
import BookingForm from '../components/Booking/BookingForm';
import '../styles/Booking.css'

function Booking() {

    return (
        <main className='booking'>
            <RestaurantInfo />
            <BookingForm />
        </main>
    )
}

export default Booking