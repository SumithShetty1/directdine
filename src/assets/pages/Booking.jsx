import React, { useState, useEffect } from 'react';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import RestaurantInfo from '../components/Booking/RestaurantInfo';
import BookingForm from '../components/Booking/BookingForm';
import '../styles/Booking.css';

function Booking() {
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore();
                const colRef = collection(db, 'Current Details');
                const querySnapshot = await getDocs(colRef);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    setCurrentRestaurant(docData);
                } else {
                    console.log('No data found in Current Details');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className='booking'>
            {currentRestaurant ? (
                <>
                    <RestaurantInfo currentRestaurant={currentRestaurant} />
                    <BookingForm currentRestaurant={currentRestaurant} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}

export default Booking;