import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, collection, getFirestore, orderBy, query, updateDoc, doc } from 'firebase/firestore';

function Added({ selectedLocation }) {
    const [restaurantData, setRestaurantData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const db = getFirestore();
        const colRef = collection(db, 'Restaurants Details');
        const q = query(colRef, orderBy('Date_of_Creation', 'desc'));

        getDocs(q)
            .then((snapshot) => {
                const restaurants = [];
                snapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    restaurants.push({
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

                setRestaurantData(filteredRestaurants);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [selectedLocation]);

    const handleRestaurantClick = async (restaurant) => {
        // Here, you would update the 'Current Details' collection with the data from the clicked restaurant
        const db = getFirestore();
        const currentDetailsDocRef = doc(db, 'Current Details', 'MbYytZaUjmmn7B0fkrTU');

        // Create an object with the data you want to update
        const updateData = {
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
            await updateDoc(currentDetailsDocRef, updateData);
            console.log('Data updated successfully.');

            // After updating, navigate to the '/booking' page
            navigate('/booking');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <section className='new-added'>
            <div className='recommend-header'>
                <h1>Newly added restaurants in {selectedLocation}</h1>
                <Link to="/restaurants">See All</Link>
            </div>
            <div className='recommend-container'>
                {restaurantData
                    .slice(0, 4) // Display only the top four highly-rated restaurants
                    .map((restaurant, index) => (
                        <article className="restaurant" key={index} onClick={() => handleRestaurantClick(restaurant)}>
                            <div className="ratings">{restaurant.ratings}</div>
                            <img src={restaurant.restaurant_image} alt='Restaurant' />
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.city}</p>
                        </article>
                    ))}
            </div>
        </section>
    );
}

export default Added;
