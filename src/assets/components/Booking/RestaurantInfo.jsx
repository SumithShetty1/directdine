import React, { useState } from 'react';
import staricon from "../../images/star-icon.png"
import locationicon from "../../images/location-icon.png";
import moneyicon from "../../images/money-icon.png"
import clockicon from "../../images/clock-icon.png"
import Review from './RestaurantInfo/Review';
import Contact from './RestaurantInfo/Contact';

function RestaurantInfo({ currentRestaurant }) {
    const [selectedTab, setSelectedTab] = useState('menu');
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const openModal = (image) => {
        setShowModal(true);
        setSelectedImage(image);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage('');
    };

    if (currentRestaurant) {
        const foodImages = currentRestaurant.Food_Images.split(',');
        const menuImages = currentRestaurant.Menu_Images.split(',');

        return (
            <section className='restaurant-info'>
                <img src={currentRestaurant.Restaurant_Image} alt='Restaurant' />
                <section className='information'>
                    <section className='info-header'>
                        <h2>{currentRestaurant.Name}</h2>
                        <div className='rating'>
                            <img src={staricon} alt="" />
                            <span>{currentRestaurant.Ratings}</span>
                        </div>
                        <p>
                            <img src={locationicon} alt='' />
                            <span>{currentRestaurant.City}</span>
                        </p>
                        <p>
                            <img src={moneyicon} alt='' />
                            <span>&#8377; {currentRestaurant.Booking_Price} for 2 approx</span>
                        </p>
                        <p>
                            <img src={clockicon} alt='' />
                            <span>{`Open from ${currentRestaurant.Opening_Time} - ${currentRestaurant.Closing_Time}, Monday to Sunday`}</span>
                        </p>
                    </section>
                    <section className='info-nav'>
                        <input
                            type="radio"
                            id="menucheck"
                            name="info-tabs"
                            value="menu"
                            checked={selectedTab === 'menu'}
                            onChange={() => handleTabChange('menu')}
                        />
                        <label htmlFor="menucheck">Menu</label>
                        <input
                            type="radio"
                            id="photoscheck"
                            name="info-tabs"
                            value="photos"
                            checked={selectedTab === 'photos'}
                            onChange={() => handleTabChange('photos')}
                        />
                        <label htmlFor="photoscheck">Photos</label>
                        <input
                            type="radio"
                            id="reviewscheck"
                            name="info-tabs"
                            value="reviews"
                            checked={selectedTab === 'reviews'}
                            onChange={() => handleTabChange('reviews')}
                        />
                        <label htmlFor="reviewscheck">Reviews</label>
                    </section>
                    <section className='info-container'>
                        {/* Render the content based on the selectedTab state */}
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
                        {selectedTab === 'reviews' && (
                            <Review currentRestaurant={currentRestaurant} />
                        )}
                    </section>
                    <Contact currentRestaurant={currentRestaurant} />
                </section>
                {showModal && (
                    <div className='modal-overlay'>
                        <div className='modal'>
                            <span className='close' onClick={closeModal}>
                                &times;
                            </span>
                            <img src={selectedImage} alt='Enlarged' />
                        </div>
                    </div>
                )}
            </section>
        );
    } else {
        return <p>Loading...</p>;
    }
}

export default RestaurantInfo