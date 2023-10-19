import React, { useState } from 'react'
import '../styles/Booking.css'
import staricon from "../images/star-icon.png"
import locationicon from "../images/location-icon.png";
import moneyicon from "../images/money-icon.png"
import clockicon from "../images/clock-icon.png"
import charcoals from "../images/Charcoals.png";
import menu from "../images/menu.png";
import phone from "../images/phone.png";
import email from "../images/email.png";
import address from "../images/address.png";

function Booking() {
    const [selectedTab, setSelectedTab] = useState('about'); // Default selected tab

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <main className='booking'>
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
                            <section className='reviews'>

                            </section>
                        )}
                    </section>
                    <section className='contact'>
                        <h3>Contact</h3>
                        <p>
                            <img src={phone} alt='' />
                            <span>+917534567892</span>
                        </p>
                        <p>
                            <img src={email} alt='' />
                            <span>abc@gmail.com</span>
                        </p>
                        <p>
                            <img src={address} alt='' />
                            <span>Chaarcoal's Family Restuarant,<br />
                                Kamala Narayana building, Vidyagiri,<br />
                                Karnataka - 574227</span>
                        </p>
                        <h3>Directions</h3>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.550931924944!2d74.98310477484651!3d13.064231612841109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4aaecf5d0a2d3%3A0x41417809d53af13b!2sChaarcoal%E2%80%99s%20Family%20Restuarant!5e0!3m2!1sen!2sin!4v1697737771017!5m2!1sen!2sin"
                            style={{ border: '0' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map of Chaarcoal's Family Restaurant"
                        />
                    </section>
                </section>
            </section>
            <section className='bookingform'>
                <form>
                    <h2>Reservation Tables</h2>
                </form>
            </section>
        </main>
    )
}

export default Booking