import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, getFirestore, updateDoc, doc } from 'firebase/firestore';

function Recommend({ selectedLocation }) {
    const [restaurantData, setRestaurantData] = useState([]); // State to store restaurant data
    const navigate = useNavigate(); // Navigation hook from React Router

    useEffect(() => {
        const db = getFirestore();
        const colRef = collection(db, 'Restaurants Details');

        getDocs(colRef)
            .then((snapshot) => {
                const restaurants = [];
                snapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    // Collect restaurant data and push it into an array
                    restaurants.push({
                        // Store necessary restaurant details
                        id: doc.id,
                        booking_price: data.Booking_Price,
                        city: data.City,
                        closing_time: data.Closing_Time,
                        date_of_creation: data.Date_of_Creation,
                        email_address: data.Email_Address,
                        food_images: data.Food_Images,
                        gmap: data.Gmap,
                        location: data.Location,
                        maximum_guests: data.Maximum_Guests,
                        menu_images: data.Menu_Images,
                        name: data.Name,
                        opening_time: data.Opening_Time,
                        phone_number: data.Phone_Number,
                        popularity: data.Popularity,
                        ratings: data.Ratings,
                        restaurant_image: data.Restaurant_Image,
                        restaurant_type: data.Restaurant_Type,
                    });
                });
                // Filter the restaurants by location
                const filteredRestaurants = restaurants.filter(restaurant => restaurant.city === selectedLocation);

                // Sort the filtered restaurants by ratings (descending order)
                filteredRestaurants.sort((a, b) => b.ratings - a.ratings);

                setRestaurantData(filteredRestaurants); // Set the filtered and sorted restaurant data
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [selectedLocation]);

    const handleRestaurantClick = async (restaurant) => {
        const db = getFirestore();
        const currentDetailsDocRef = doc(db, 'Current Details', 'MbYytZaUjmmn7B0fkrTU');

        const updateData = {
            // Update the data to be stored in 'Current Details'
            id: restaurant.id,
            Booking_Price: restaurant.booking_price,
            City: restaurant.city,
            Closing_Time: restaurant.closing_time,
            Date_of_Creation: restaurant.date_of_creation,
            Email_Address: restaurant.email_address,
            Food_Images: restaurant.food_images,
            Gmap: restaurant.gmap,
            Location: restaurant.location,
            Maximum_Guests: restaurant.maximum_guests,
            Menu_Images: restaurant.menu_images,
            Name: restaurant.name,
            Opening_Time: restaurant.opening_time,
            Phone_Number: restaurant.phone_number,
            Popularity: restaurant.popularity,
            Ratings: restaurant.ratings,
            Restaurant_Image: restaurant.restaurant_image,
            Restaurant_Type: restaurant.restaurant_type,
        };

        try {
            await updateDoc(currentDetailsDocRef, updateData); // Update document in Firestore
            console.log('Data updated successfully.');

            // Navigate to the '/booking' page after updating data
            navigate('/booking');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleSeeAllClick = () => {
        // Navigate to '/restaurants' page to see all recommended restaurants
        if (restaurantData && restaurantData.length > 0) {
            navigate('/restaurants', { state: { sectionTitle: 'Recommended restaurants in ' + selectedLocation } });
        } else {
            console.log('No restaurant data available');
        }
    };

    return (
        <section className='recommend'>
            <div className='recommend-header'>
                {/* Display the title with the selected location */}
                <h1>Recommended restaurants in {selectedLocation}</h1>
                {/* Allow users to see all recommended restaurants */}
                <span className='link' onClick={handleSeeAllClick}>See All</span>
            </div>
            <div className='recommend-container'>
                {/* Display top four highly-rated restaurants */}
                {restaurantData
                    .slice(0, 4) // Display only the top four highly-rated restaurants
                    .map((restaurant, index) => (
                        // Display each restaurant with its details
                        <article className="restaurant" key={index} onClick={() => handleRestaurantClick(restaurant)}>
                            {/* Restaurant ratings */}
                            <div className="ratings">{restaurant.ratings}</div>
                            {/* Restaurant image */}
                            <img src={restaurant.restaurant_image} alt='Restaurant' />
                            {/* Restaurant name */}
                            <h3>{restaurant.name}</h3>
                            {/* Restaurant city */}
                            <p>{restaurant.city}</p>
                        </article>
                    ))}
            </div>
        </section>
    );
}

export default Recommend;