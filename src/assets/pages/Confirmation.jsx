import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore';
import '../styles/Confirmation.css'

// Function to format ISO date to DD-MM-YYYY
function formatISODateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
}

function Confirmation() {
    const navigate = useNavigate();

    // Extracting data from location state
    const location = useLocation();
    const {
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
    } = location.state || {};

    // Formatting the date received from location state
    const formattedDate = formatISODateToDDMMYYYY(date);

    const [isProcessing, setIsProcessing] = useState(false);

    // Handling payment process
    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const db = getFirestore();

            // Getting current date
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            // Creating a reference to the 'Reservations' collection in Firestore
            const reservationsRef = collection(db, 'Reservations');

            // Creating reservation data
            const reservationData = {
                username,
                userEmail,
                rname,
                email,
                price,
                currentdate: formattedDate,
                date,
                time,
                diners,
                phone,
                special,
            };

            // Adding reservation data to Firestore
            await addDoc(reservationsRef, reservationData);

            // Updating restaurant popularity
            const restaurantDocRef = doc(db, 'Restaurants Details', id);
            const restaurantSnapshot = await getDoc(restaurantDocRef);
            if (restaurantSnapshot.exists()) {
                const restaurantData = restaurantSnapshot.data();
                const currentPopularity = restaurantData.Popularity || 0;
                const updatedPopularity = currentPopularity + 1;

                await updateDoc(restaurantDocRef, { Popularity: updatedPopularity });
            }

            setIsProcessing(false);
            navigate('/confirmed', { state: reservationData });
        } catch (error) {
            console.error('Error processing payment:', error);
            setIsProcessing(false);
        }
    };

    // Handling edit/back action
    const handleEdit = () => {
        navigate('/booking');
    };

    return (
        <main className='confirmation'>
            {/* Header section */}
            <div className='confirmation-header'>
                <h1>Confirmation</h1>
            </div>

            {/* Reservation Details */}
            <div className='confirmation-container'>
                <h2>Reservation Details</h2>
                <div className='confirmation-details'>
                    <div>
                        {/* Displaying reservation details */}
                        <span className='details'>
                            <p>
                                <strong>Restaurant Name</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{rname}</span>
                            </p>
                            {/* Displaying user's name */}
                            <p>
                                <strong>Name</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{username}</span>
                            </p>
                        </span>
                        {/* Displaying number of diners and phone number */}
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
                        {/* Displaying date, special requests, and time */}
                        <span className='details'>
                            <p>
                                <strong>Date</strong>
                                <span className='colon'>:</span>
                                <span className='details-value'>{formattedDate}</span>
                            </p>
                            <p>
                                <strong>Special Requests</strong>
                                <span className='colon'>:</span>
                                {special ? (
                                    <span className='special-confirmation'>
                                        {special}
                                    </span>
                                ) : (
                                    <span className='special-confirmation'>
                                        No special requests
                                    </span>
                                )}
                            </p>
                        </span>
                        <span className='details'>
                            <p>
                                <strong>Time</strong>
                                <span>:</span>
                                <span className='details-value'>{time}</span>
                            </p>
                        </span>
                    </div>
                </div>

                {/* Edit/Back button */}
                <div className='edit-btn-container'>
                    <button onClick={handleEdit} className='edit-btn'>Edit/ Back</button>
                </div>
                <hr />
            </div>

            {/* Payment Details */}
            <div className='payment-section'>
                <h2>Payment Details</h2>
                <div className='pay-details'>
                    {/* Displaying amount to pay */}
                    <p className='details'>
                        <strong>Amount to Pay</strong>
                        <span className='colon'>:</span>
                        <span className='details-value'>{price}</span>
                    </p>
                </div>
                <div className='pay-btn-container'>
                    {/* Displaying payment processing message or Pay Now button */}
                    {isProcessing ? (
                        <div className='processing-message'>
                            <div className='spinner'></div>
                            <p>Payment is being processed...</p>
                        </div>
                    ) : (
                        <button onClick={handlePayment} className='pay-btn'>
                            Pay Now
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Confirmation;
