import React, {useState} from 'react'
import staricon from "../../images/star-icon.png"
import locationicon from "../../images/location-icon.png";
import moneyicon from "../../images/money-icon.png"
import clockicon from "../../images/clock-icon.png"
import charcoals from "../../images/Charcoals.png";
import menu from "../../images/menu.png";
import Review from './RestaurantInfo/Review';
import Contact from './RestaurantInfo/Contact';

function RestaurantInfo() {
    const [selectedTab, setSelectedTab] = useState('about'); // Default selected tab

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <section className='restaurant-info'>
            <img src={charcoals} alt='Restaurant' />
            <section className='information'>
                <section className='info-header'>
                    <h2>Charcoal's Family Restaurant</h2>
                    <div className='rating'>
                        <img src={staricon} alt="" />
                        <span>4.5</span>
                    </div>
                    <p>
                        <img src={locationicon} alt='' />
                        <span>Moodbidri</span>
                    </p>
                    <p>
                        <img src={moneyicon} alt='' />
                        <span>&#8377; 100 for 2 approx</span>
                    </p>
                    <p>
                        <img src={clockicon} alt='' />
                        <span>Open from 09:00am - 09:00pm, Monday to Sunday</span>
                    </p>
                </section>
                <section className='info-nav'>
                    <input
                        type="radio"
                        id="aboutcheck"
                        name="info-tabs"
                        value="about"
                        checked={selectedTab === 'about'}
                        onChange={() => handleTabChange('about')}
                    />
                    <label htmlFor="aboutcheck">About</label>
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
                    {selectedTab === 'about' && (
                        <section className='info-about'>
                            <div>
                                <h3>Cuisine</h3>
                                <p>South Indian, North Indian, Chinese, Fast Food</p>
                            </div>
                            <div>
                                <h3>Bestselling Items</h3>
                                <p>Kesari Bath, Chow Chow Bath, 2 Idli 1 Vada Sambar, Rice Bath, Avalakki Bath</p>
                            </div>
                            <div>
                                <h3>Facilities & Features</h3>
                                <p>Parking, Air Conditioned, Wifi, Cards Accepted, Wallet Accepted</p>
                            </div>
                        </section>
                    )}
                    {selectedTab === 'menu' && (
                        <figure>
                            <img src={menu} alt="" />
                            <img src={menu} alt="" />
                            <img src={menu} alt="" />
                        </figure>
                    )}
                    {selectedTab === 'photos' && (
                        <figure className='photos'>
                            <img src={menu} alt="" />
                            <img src={menu} alt="" />
                            <img src={menu} alt="" />
                            <img src={menu} alt="" />
                            <img src={menu} alt="" />
                        </figure>
                    )}
                    {selectedTab === 'reviews' && (
                        <Review/>
                    )}
                </section>
                <Contact/>
            </section>
        </section>
    )
}

export default RestaurantInfo