import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Confirmed.css'
import confirmed from '../images/confirmed.png'

function formatISODateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
}

function Confirmed() {
    const restaurantname = "Charcoal's Family Restaurant"
    const name = "Sumith Shetty"
    const isoDate = new Date().toISOString().split('T')[0];
    const formattedDate = formatISODateToDDMMYYYY(isoDate);
    const time = '9:00 pm'
    const diners = 1;
    const phone = 7878787878;
    const special = '';
    const amountPaid = 50.00;

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
                        <span className='details'>
                            <p>
                                <strong>Restaurant Name</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{restaurantname}</span>
                            </p>
                            <p>
                                <strong>Name</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{name}</span>
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
                                <span>{amountPaid.toFixed(2)}</span> {/* Display the amount paid with two decimal places */}
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
