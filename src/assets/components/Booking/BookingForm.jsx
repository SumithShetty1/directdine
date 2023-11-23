import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function BookingForm({ currentRestaurant }) {
    const navigate = useNavigate();

    // Retrieving user details from authentication context
    const { user } = UserAuth();
    const username = user ? user.displayName : '';
    const userEmail = user ? user.email : '';

    // Extracting restaurant details from props
    const id = currentRestaurant?.id;
    const rname = currentRestaurant?.Name;
    const [price, setPrice] = useState(currentRestaurant?.Booking_Price / 2);
    const opening = currentRestaurant?.Opening_Time;
    const closing = currentRestaurant?.Closing_Time;
    const max_guests = currentRestaurant?.Maximum_Guests;
    const email = currentRestaurant?.Email_Address;

    // State for various form fields
    const [date, setDate] = useState(getDefaultDate());
    const [diners, setDiners] = useState(1);
    const [phone, setPhone] = useState('');
    const [special, setSpecial] = useState('');
    const [timeOptions, setTimeOptions] = useState([]);
    const [time, setTime] = useState(timeOptions.length > 0 ? timeOptions[0] : '');

    // Utility function to get the default date for the date input field
    function getDefaultDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

        return tomorrow.toISOString().split('T')[0];
    }

    // Utility function to get the maximum date allowed for booking
    function getMaxDate() {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 31);
        return maxDate.toISOString().split('T')[0];
    }

    useEffect(() => {
        // Check if the selected time is within the available time options
        if (timeOptions.length > 0 && !timeOptions.includes(time)) {
            // If the selected time is not in the updated options, set the first available time
            setTime(timeOptions[0]);
        }
    }, [timeOptions, time]);

    // Function to fetch reserved times for a selected date
    const fetchReservedTimes = async (selectedDate) => {
        try {
            const db = getFirestore();
            const reservationsRef = collection(db, 'Reservations');
            const dateQuery = query(reservationsRef, where('date', '==', selectedDate), where('email', '==', email));
            const querySnapshot = await getDocs(dateQuery);

            let bookedTimes = new Set();
            querySnapshot.forEach((doc) => {
                bookedTimes.add(doc.data().time);
            });

            const startTime = new Date(`01/01/2023 ${opening}`);
            const endTime = new Date(`01/02/2023 ${closing}`);
            const initialTimeOptions = [];

            while (startTime <= endTime) {
                const formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const isBooked = bookedTimes.has(formattedTime);
                const isNextHourBooked = bookedTimes.has(addHours(startTime, 1));
                const isPrevHourBooked = bookedTimes.has(subHours(startTime, 1));

                if (!isBooked && !isNextHourBooked && !isPrevHourBooked) {
                    initialTimeOptions.push(formattedTime);
                }

                startTime.setHours(startTime.getHours() + 1);

                if (startTime.getHours() === 0 && startTime.getMinutes() === 0) {
                    break;
                }
            }

            // If a time is already selected, filter out the subsequent time from options
            if (time) {
                const selectedIndex = initialTimeOptions.indexOf(time);
                if (selectedIndex !== -1 && selectedIndex < initialTimeOptions.length - 1) {
                    initialTimeOptions.splice(selectedIndex + 1, initialTimeOptions.length - selectedIndex - 1);
                }
            }

            setTimeOptions(initialTimeOptions);
        } catch (error) {
            console.error('Error fetching reserved times:', error);
        }
    };


    // Helper function to add hours to a date
    const addHours = (date, hours) => {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Helper function to subtract hours from a date
    const subHours = (date, hours) => {
        const result = new Date(date);
        result.setHours(result.getHours() - hours);
        return result.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        // Fetch initial time options based on opening and closing times
        const startTime = new Date(`01/01/2023 ${opening}`);
        const endTime = new Date(`01/02/2023 ${closing}`);
        const initialTimeOptions = [];

        while (startTime <= endTime) {
            initialTimeOptions.push(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            startTime.setHours(startTime.getHours() + 1);

            if (startTime.getHours() === 0 && startTime.getMinutes() === 0) {
                break;
            }
        }

        setTimeOptions(initialTimeOptions);

        // Fetch reserved times for the default date
        fetchReservedTimes(date);
    }, [date, opening, closing]);

    // Function to handle date change
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        fetchReservedTimes(selectedDate);
    };

    // Function to handle time change
    const handleTimeChange = (e) => {
        const selectedTime = e.target.value;
        setTime(selectedTime);
    };

    // Generating guest options for the dropdown
    const guestOptions = [];
    for (let i = 1; i <= max_guests; i++) {
        guestOptions.push(i);
    }

    // Function to handle the change in the number of diners
    const handleDinersChange = (e) => {
        const selectedDiners = parseInt(e.target.value);
        setDiners(selectedDiners);

        const basePrice = currentRestaurant?.Booking_Price;
        const pricePerGuest = basePrice / 2; // Assuming initial price is for 2 guests
        const calculatedPrice = selectedDiners <= 2 ? basePrice : pricePerGuest * selectedDiners;
        setPrice(calculatedPrice);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please log in to make a reservation.');
            return;
        }

        navigate('/confirmation', {
            state: {
                id,
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
    };

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
                        {timeOptions.length <= 1 ? (
                            <option disabled value="">
                                All time slots are booked for this date
                            </option>
                        ) : (
                            timeOptions.map((option, index) => (
                                <option key={`${option}-${index}`} value={option}>
                                    {option}
                                </option>
                            ))
                        )}
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