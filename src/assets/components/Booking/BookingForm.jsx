import React, { useState } from 'react'

function BookingForm() {
    const [date, setDate] = useState(getDefaultDate());
    const [time, setTime] = useState('');
    const [diners, setDiners] = useState(1);
    const [phone, setPhone] = useState('');
    const [special, setSpecial] = useState('');

    // Function to get the default date as a string in "YYYY-MM-DD" format
    function getDefaultDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    // Function to get the maximum date as a string in "YYYY-MM-DD" format (31 days from the current date)
    function getMaxDate() {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 31);
        return maxDate.toISOString().split('T')[0];
    }

    // Function to handle date changes
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
    }

    // Function to handle time changes
    const handleTimeChange = (e) => {
        const selectedTime = e.target.value;
        setTime(selectedTime);
    }

    // Array of options for the times
    const timeOptions = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
        '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
    ];

    // Array of options for the number of guests
    const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleSubmit = (e) => {
        e.preventDefault();
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
                        onChange={handleDateChange} // Update the state when the user changes the date
                        min={getDefaultDate()} // Set minimum date to the current date
                        max={getMaxDate()} // Set maximum date to 31 days from the current date
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
                        onChange={(e) => setDiners(e.target.value)}
                        aria-label="Select Number of Diners"
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

export default BookingForm