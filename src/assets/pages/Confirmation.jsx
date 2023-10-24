import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Confirmation.css'

function formatISODateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
}

function Confirmation() {
    const navigate = useNavigate();

    const restaurantname = "Charcoal's Family Restaurant"
    const name = "Sumith Shetty"
    const isoDate = new Date().toISOString().split('T')[0];
    const formattedDate = formatISODateToDDMMYYYY(isoDate);
    const time = '9:00 pm'
    const diners = 1;
    const phone = 7878787878;
    const special = '';
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true); // Set the processing state to true
        setTimeout(() => {
            // Simulate payment processing for 2 seconds (adjust the delay as needed)
            setIsProcessing(false); // Set the processing state back to false
            navigate('/confirmed'); // Redirect to the confirmed page
        }, 2000); // Simulate a 2-second delay
    };

    const handleEdit = () => {
        // Navigate back to the BookingForm with the booking data
        navigate('/booking');
    };

    return (
        <main className='confirmation'>
            <div className='confirmation-header'>
                <h1>Confirmation</h1>
            </div>
            <div className='confirmation-container'>
                <h2>Reservation Details</h2>
                <div className='confirmation-details'>
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
                <div className='edit-btn-container'>
                    <button onClick={handleEdit} className='edit-btn'>Edit/ Back</button>
                </div>
                <hr />
            </div>
            <div className='payment-section'>
                <h2>Payment Details</h2>
                <div className='pay-details'>
                    <p className='details'>
                        <strong>Amount to Pay</strong>
                        <span className='colon'>:</span>
                        <span className='details-value'>50.00</span>
                    </p>
                </div>
                <div className='pay-btn-container'>
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
