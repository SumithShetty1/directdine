import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Confirmed.css'
import confirmed from '../images/confirmed.png'

// Function to format ISO date to DD-MM-YYYY
function formatISODateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
}

function Confirmed() {
    // Get data passed from the previous location
    const location = useLocation();
    const {
        username,
        rname,
        price,
        date,
        time,
        diners,
        phone,
        special,
    } = location.state || {};

    // Format the date to DD-MM-YYYY
    const formattedDate = formatISODateToDDMMYYYY(date);

    return (
        <main className='confirmed'>
            <div className='confirmed-header'>
                <h1>Booking Confirmed</h1>
            </div>
            <div className='confirmed-container'>
                <div className='confirmed-icon'>
                    <img src={confirmed} alt="" />
                </div>
                <h2>Your table has been reserved for the following details:</h2>
                <div className='confirmed-details'>
                    <div>
                        {/* Details of the reservation */}
                        <span className='details'>
                            <p>
                                <strong>Restaurant Name</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{rname}</span>
                            </p>
                            <p>
                                <strong>Name</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{username}</span>
                            </p>
                        </span>
                        <span className='details'>
                            <p>
                                <strong>Number of Diners</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{diners} {diners > 1 ? 'Guests' : 'Guest'}</span>
                            </p>
                            <p>
                                <strong>Phone Number</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{phone}</span>
                            </p>
                        </span>
                        <span className='details'>
                            <p>
                                <strong>Date</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{formattedDate}</span>
                            </p>
                            <p>
                                <strong>Amount Paid</strong>
                                <span className='colon'>:</span>
                                <span>{price}</span> {/* Display the amount paid with two decimal places */}
                            </p>
                        </span>
                        <span className='details'>
                            <p>
                                <strong>Time</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{time}</span>
                            </p>
                            <p>
                                <strong>Special Requests</strong>
                                <span className='colon'>:</span>
                                {special ? (
                                    <span className='special-confirmed'>
                                        {special}
                                    </span>
                                ) : (
                                    <span className='special-confirmed'>
                                        No special requests
                                    </span>
                                )}
                            </p>
                        </span>
                    </div>
                </div>
                {/* Thank you message and back button */}
                <h2>Thank you for choosing our restaurant. We look forward to serving you!</h2>
                <div className='back-link'>
                    <Link to='/'>
                        <button className='back-btn'>Back</button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Confirmed;
