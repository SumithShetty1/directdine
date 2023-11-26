import React, { useState, useEffect } from 'react';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import RestaurantInfo from '../components/Booking/RestaurantInfo';
import BookingForm from '../components/Booking/BookingForm';
import '../styles/Booking.css';

function Booking() {
    // State to hold the current restaurant data
    const [currentRestaurant, setCurrentRestaurant] = useState(null);

    useEffect(() => {
        // Fetching data from Firestore when the component mounts
        const fetchData = async () => {
            try {
                // Getting Firestore instance
                const db = getFirestore();

                // Creating a reference to the 'Current Details' collection
                const colRef = collection(db, 'Current Details');

                // Getting the documents in the collection
                const querySnapshot = await getDocs(colRef);

                if (!querySnapshot.empty) {
                    // Extracting the data from the first document
                    const docData = querySnapshot.docs[0].data();

                    // Setting the current restaurant state with the fetched data
                    setCurrentRestaurant(docData);
                } else {
                    console.log('No data found in Current Details');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Calling the fetchData function
    }, []);

    return (
        <main className='booking'>
            {/* Rendering components based on currentRestaurant state */}
            {currentRestaurant ? (
                <>
                    {/* Rendering RestaurantInfo component */}
                    <RestaurantInfo currentRestaurant={currentRestaurant} />

                    {/* Rendering BookingForm component */}
                    <BookingForm currentRestaurant={currentRestaurant} />
                </>
            ) : (
                // Displaying a loading message if currentRestaurant is null
                <p>Loading...</p>
            )}
        </main>
    );
}

export default Booking;
