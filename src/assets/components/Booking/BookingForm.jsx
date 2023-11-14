import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';

function BookingForm({ currentRestaurant }) {
    const navigate = useNavigate();

    const { user } = UserAuth();
    const username = user ? user.displayName : '';
    const userEmail = user ? user.email : '';
    const rname = currentRestaurant?.Name;
    const [price, setPrice] = useState(currentRestaurant?.Booking_Price / 2);
    const opening = currentRestaurant?.Opening_Time;
    const closing = currentRestaurant?.Closing_Time;
    const max_guests = currentRestaurant?.Maximum_Guests;
    const email= currentRestaurant?.Email_Address;

    const [date, setDate] = useState(getDefaultDate());
    const [diners, setDiners] = useState(1);
    const [phone, setPhone] = useState('');
    const [special, setSpecial] = useState('');

    function getDefaultDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

        return tomorrow.toISOString().split('T')[0];
    }

    function getMaxDate() {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 31);
        return maxDate.toISOString().split('T')[0];
    }

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
    }

    const handleTimeChange = (e) => {
        const selectedTime = e.target.value;
        setTime(selectedTime);
    }

    const startTime = new Date(`01/01/2023 ${opening}`);
    const endTime = new Date(`01/02/2023 ${closing}`);

    const timeOptions = [];

    while (startTime <= endTime) {
        timeOptions.push(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        startTime.setHours(startTime.getHours() + 1);

        // Stop the loop at 12:00 PM instead of midnight
        if (startTime.getHours() === 0 && startTime.getMinutes() === 0) {
            break;
        }
    }

    const [time, setTime] = useState(timeOptions.length > 0 ? timeOptions[0] : '');

    const guestOptions = [];
    for (let i = 1; i <= max_guests; i++) {
        guestOptions.push(i);
    }

    const handleDinersChange = (e) => {
        const selectedDiners = parseInt(e.target.value);
        setDiners(selectedDiners);

        // Adjust price based on the number of diners
        const basePrice = currentRestaurant?.Booking_Price;
        const pricePerGuest = basePrice / 2; // Assuming initial price is for 2 guests
        const calculatedPrice = selectedDiners <= 2 ? basePrice : pricePerGuest * selectedDiners;
        setPrice(calculatedPrice);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            // Show an alert if the user is not logged in
            alert('Please log in to make a reservation.');
            return;
        }

        navigate('/confirmation', {
            state: {
                username,
                userEmail,
                rname,
                email,
                price,
                date,
                time,
                diners,
                phone,
                special,
            }
        });
    }

    return (
        <section className='bookingform'>
            <form onSubmit={handleSubmit}>
                <h3>Reserve Your Table</h3>
                <div className='formcontainer'>
                    <label htmlFor="date">Choose date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={handleDateChange}
                        min={getDefaultDate()}
                        max={getMaxDate()}
                        aria-label="Select a date for your reservation"
                        required
                    />
                    <label htmlFor="time">Choose time</label>
                    <select
                        id="time"
                        name="time"
                        value={time}
                        onChange={handleTimeChange}
                        aria-label="Select a time for your reservation"
                        required
                    >
                        {timeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="diners">Number of Diners</label>
                    <select
                        id="diners"
                        name="diners"
                        value={diners}
                        onChange={handleDinersChange}
                        aria-label="Select Number of Diners"
                        required
                    >
                        {guestOptions.map((option) => (
                            <option key={option} value={option}>
                                {`${option} Guest${option > 1 ? 's' : ''}`}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='Enter your Phone Number'
                        aria-label="Enter your Phone Number"
                        pattern="[0-9]{10}"
                        required
                    />
                    <label htmlFor="special">Special Requests <span className='optional'>(optional)</span></label>
                    <textarea
                        id="special"
                        name="special"
                        value={special}
                        onChange={(e) => setSpecial(e.target.value)}
                        placeholder='Comment'
                        aria-label="Enter your special request"
                    />
                    <input
                        type="submit"
                        value="Make your Reservation"
                        className='submitbtn'
                    />
                </div>
            </form>
        </section>
    )
}

export default BookingForm;
