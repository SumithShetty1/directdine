import React, { useState } from 'react';
import staricon from "../../images/star-icon.png"
import locationicon from "../../images/location-icon.png";
import moneyicon from "../../images/money-icon.png"
import clockicon from "../../images/clock-icon.png"
import Review from './RestaurantInfo/Review';
import Contact from './RestaurantInfo/Contact';

function RestaurantInfo({ currentRestaurant }) {
    // State for controlling selected tab, modal visibility, and selected image
    const [selectedTab, setSelectedTab] = useState('menu');
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    // Function to change the selected tab
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    // Functions to control modal visibility and selected image
    const openModal = (image) => {
        setShowModal(true);
        setSelectedImage(image);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage('');
    };

    // Rendering section based on currentRestaurant data
    if (currentRestaurant) {
        const foodImages = currentRestaurant.Food_Images.split(',');
        const menuImages = currentRestaurant.Menu_Images.split(',');

        return (
            <section className='restaurant-info'>
                {/* Display basic restaurant information */}
                <img src={currentRestaurant.Restaurant_Image} alt='Restaurant' />
                <section className='information'>
                    <section className='info-header'>
                        {/* Restaurant name */}
                        <h2>{currentRestaurant.Name}</h2>
                        {/* Restaurant rating */}
                        <div className='rating'>
                            <img src={staricon} alt="" />
                            <span>{currentRestaurant.Ratings}</span>
                        </div>
                        {/* Restaurant location */}
                        <p>
                            <img src={locationicon} alt='' />
                            <span>{currentRestaurant.City}</span>
                        </p>
                        {/* Approximate booking price */}
                        <p>
                            <img src={moneyicon} alt='' />
                            <span>&#8377; {currentRestaurant.Booking_Price} for 2 approx</span>
                        </p>
                        {/* Opening and closing hours */}
                        <p>
                            <img src={clockicon} alt='' />
                            <span>{`Open from ${currentRestaurant.Opening_Time} - ${currentRestaurant.Closing_Time}, Monday to Sunday`}</span>
                        </p>
                    </section>
                    {/* Tab navigation */}
                    <section className='info-nav'>
                        <input
                            type="radio"
                            id="menucheck"
                            name="info-tabs"
                            value="menu"
                            checked={selectedTab === 'menu'}
                            onChange={() => handleTabChange('menu')}
                        />
                        {/* Label for menu */}
                        <label htmlFor="menucheck">Menu</label>
                        {/* Input for photos */}
                        <input
                            type="radio"
                            id="photoscheck"
                            name="info-tabs"
                            value="photos"
                            checked={selectedTab === 'photos'}
                            onChange={() => handleTabChange('photos')}
                        />
                        {/* Label for photos */}
                        <label htmlFor="photoscheck">Photos</label>
                        {/* Input for reviews */}
                        <input
                            type="radio"
                            id="reviewscheck"
                            name="info-tabs"
                            value="reviews"
                            checked={selectedTab === 'reviews'}
                            onChange={() => handleTabChange('reviews')}
                        />
                        {/* Label for reviews */}
                        <label htmlFor="reviewscheck">Reviews</label>
                    </section>
                    {/* Display content based on selected tab */}
                    <section className='info-container'>
                        {/* Show menu images */}
                        {selectedTab === 'menu' && (
                            <figure className='photos'>
                                {menuImages.map((menuImage, index) => (
                                    <img
                                        key={index}
                                        src={menuImage}
                                        alt={`Menu ${index}`}
                                        onClick={() => openModal(menuImage)}
                                    />
                                ))}
                            </figure>
                        )}
                        {/* Show food images */}
                        {selectedTab === 'photos' && (
                            <figure className='photos'>
                                {foodImages.map((foodImage, index) => (
                                    <img
                                        key={index}
                                        src={foodImage}
                                        alt={`Food ${index}`}
                                        onClick={() => openModal(foodImage)}
                                    />
                                ))}
                            </figure>
                        )}
                        {/* Show reviews */}
                        {selectedTab === 'reviews' && (
                            <Review currentRestaurant={currentRestaurant} />
                        )}
                    </section>
                    {/* Contact component */}
                    <Contact currentRestaurant={currentRestaurant} />
                </section>
                {/* Modal for enlarged images */}
                {showModal && (
                    <div className='modal-overlay'>
                        <div className='modal'>
                            {/* Close button */}
                            <span className='close' onClick={closeModal}>
                                &times;
                            </span>
                            {/* Enlarged image */}
                            <img src={selectedImage} alt='Enlarged' />
                        </div>
                    </div>
                )}
            </section>
        );
    } else {
        // If restaurant data is not yet available, show 'Loading...'
        return <p>Loading...</p>;
    }
}

export default RestaurantInfo;
