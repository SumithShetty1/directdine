import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import '../styles/Restaurants.css'
import { useLocation } from 'react-router-dom';
import popularityicon from "../images/popularity-icon.png";
import minusicon from "../images/minus-icon.png";
import plusicon from "../images/plus-icon.png";

function Restaurants() {
  const [sortOption, setSortOption] = useState('ratings');
  const [displayedData, setDisplayedData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurantData, sectionTitle } = location.state || {};
  const [filterOptions, setFilterOptions] = useState({
    pureVeg: false,
    vegAndNonVeg: false,
  });

  useEffect(() => {
    const applyFilter = () => {
      let filteredRestaurants = [...restaurantData];

      if (filterOptions.pureVeg && filterOptions.vegAndNonVeg) {
        // Display all data if both checkboxes are checked
        setDisplayedData(filteredRestaurants);
        return;
      }

      if (filterOptions.pureVeg) {
        filteredRestaurants = filteredRestaurants.filter(
          (restaurant) => restaurant.restaurant_type === 'Pure Veg'
        );
      }
      if (filterOptions.vegAndNonVeg) {
        filteredRestaurants = filteredRestaurants.filter(
          (restaurant) => restaurant.restaurant_type === 'Veg and Non Veg'
        );
      }

      if (sortOption === 'popularity') {
        filteredRestaurants.sort((a, b) => b.popularity - a.popularity);
      }

      setDisplayedData(filteredRestaurants);
    };

    applyFilter();
  }, [sortOption, restaurantData, filterOptions]);

  const handleRestaurantClick = async (restaurant) => {
    const db = getFirestore();
    const currentDetailsDocRef = doc(db, 'Current Details', 'MbYytZaUjmmn7B0fkrTU');

    const updateData = {
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
      await updateDoc(currentDetailsDocRef, updateData);
      console.log('Data updated successfully.');

      // After updating and adding a reservation, navigate to the '/booking' page
      navigate('/booking');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilterOptions({ ...filterOptions, [name]: checked });
  };

  return (
    <main className='restaurantspage'>
      <aside className='filter'>
        <h3>Quick Filters</h3>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <img src={plusicon} alt='' className='plusicon' />
          <img src={minusicon} alt='' className='minusicon' />
        </label>
        <div className='filter-options'>
          <div>
            <input
              type="checkbox"
              name="pureVeg"
              id="pureveg"
              checked={filterOptions.pureVeg}
              onChange={handleCheckboxChange}
            />
            <label htmlFor='pureveg'>Pure Veg</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="vegAndNonVeg"
              id="nonveg"
              checked={filterOptions.vegAndNonVeg}
              onChange={handleCheckboxChange}
            />
            <label htmlFor='nonveg'>Veg and Non Veg</label>
          </div>
        </div>
      </aside>
      <section className='recommended'>
        <div className='recommended-header'>
          <h1>{sectionTitle}</h1>
          <div className='sort-container'>
            <label htmlFor="sort">Sort By</label>
            <select id='sort' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="ratings">Ratings</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
        <div className='recommended-container'>
          {displayedData && displayedData.length > 0 ? (
            displayedData.map((restaurant, index) => (
              <section className="restaurant-lists" key={index} onClick={() => handleRestaurantClick(restaurant)}>
                <div className="restaurant-ratings">{restaurant.ratings}</div>
                <img src={restaurant.restaurant_image} alt='Restaurant' />
                <div className='restaurant-details'>
                  <h2>{restaurant.name}</h2>
                  <p className='location'>{restaurant.city}</p>
                  <p>&#8377; {restaurant.booking_price} for 2 approx</p>
                  <div className='popularity'>
                    <img src={popularityicon} alt='' />
                    <span>{restaurant.popularity}</span>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <p>No restaurant data available</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Restaurants