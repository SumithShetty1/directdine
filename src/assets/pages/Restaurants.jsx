import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, getFirestore, updateDoc, doc } from 'firebase/firestore';
import '../styles/Restaurants.css'
import { useLocation } from 'react-router-dom';
import popularityicon from "../images/popularity-icon.png";
import minusicon from "../images/minus-icon.png";
import plusicon from "../images/plus-icon.png";

function Restaurants({ selectedLocation }) {
  const [displayedData, setDisplayedData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionTitle } = location.state || {};
  const [filterOptions, setFilterOptions] = useState({
    pureVeg: false,
    vegAndNonVeg: false,
  });
  const [sortOption, setSortOption] = useState('ratings');

  useEffect(() => {
    const db = getFirestore();
    const colRef = collection(db, 'Restaurants Details');

    getDocs(colRef)
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
        const filteredRestaurants = selectedLocation
          ? restaurants.filter((restaurant) => restaurant.city === selectedLocation)
          : restaurants;

        // Apply additional filters based on checkbox state
        let displayData = applyFilters(filteredRestaurants);

        // Apply sorting based on sort option
        displayData = applySort(displayData);

        setDisplayedData(displayData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [selectedLocation]);

  // Function to filter restaurants based on checkbox options
  const applyFilters = (data) => {
    let filteredRestaurants = [...data];

    if (filterOptions.pureVeg && filterOptions.vegAndNonVeg) {
      // Display all data if both checkboxes are checked
      return filteredRestaurants;
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

    return filteredRestaurants;
  };

  // Function to sort restaurants based on selected option
  const applySort = (data) => {
    let sortedRestaurants = [...data];
    if (sortOption === 'popularity') {
      sortedRestaurants.sort((a, b) => b.popularity - a.popularity);
    } else {
      // Sort by default: ratings
      sortedRestaurants.sort((a, b) => b.ratings - a.ratings);
    }
    return sortedRestaurants;
  };

  // Function to handle clicks on restaurant items
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

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilterOptions({ ...filterOptions, [name]: checked });
  };

  return (
    <main className='restaurantspage'>
      {/* Sidebar for quick filters */}
      <aside className='filter'>
        <h3>Quick Filters</h3>
        {/* Toggle button for the filter options */}
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          {/* Icons for collapsing/expanding the filter options */}
          <img src={plusicon} alt='' className='plusicon' />
          <img src={minusicon} alt='' className='minusicon' />
        </label>
        {/* Filter options for pure veg and veg/non-veg */}
        <div className='filter-options'>
          <div>
            {/* Checkbox for selecting pure veg option */}
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
            {/* Checkbox for selecting veg and non-veg option */}
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

      {/* Section displaying recommended restaurants */}
      <section className='recommended'>
        <div className='recommended-header'>
          {/* Title of the section */}
          <h1>{sectionTitle}</h1>
          {/* Dropdown for sorting options */}
          <div className='sort-container'>
            <label htmlFor="sort">Sort By</label>
            <select id='sort' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              {/* Sorting options */}
              <option value="ratings">Ratings</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        {/* Container for displaying restaurant cards */}
        <div className='recommended-container'>
          {displayedData && displayedData.length > 0 ? (
            // Displaying individual restaurant cards
            displayedData.map((restaurant, index) => (
              <section className="restaurant-lists" key={index} onClick={() => handleRestaurantClick(restaurant)}>
                {/* Restaurant details */}
                <div className="restaurant-ratings">{restaurant.ratings}</div>
                <img src={restaurant.restaurant_image} alt='Restaurant' />
                <div className='restaurant-details'>
                  <h2>{restaurant.name}</h2>
                  <p className='location'>{restaurant.city}</p>
                  <p>&#8377; {restaurant.booking_price} for 2 approx</p>
                  {/* Popularity section */}
                  <div className='popularity'>
                    <img src={popularityicon} alt='' />
                    <span>{restaurant.popularity}</span>
                  </div>
                </div>
              </section>
            ))
          ) : (
            // Displayed when no restaurant data is available
            <p>No restaurant data available</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Restaurants