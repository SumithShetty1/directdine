import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Booking.css'
import staricon from "../images/star-icon.png"
import locationicon from "../images/location-icon.png";
import moneyicon from "../images/money-icon.png"
import clockicon from "../images/clock-icon.png"
import charcoals from "../images/Charcoals.png";

function Booking() {
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
                        <Link>Menu</Link>
                        <Link>Photos</Link>
                        <Link>Reviews</Link>
                        <Link>Contact</Link>
                    </section>
                    <section className='info-container'>

                    </section>
                </section>
            </section>
        </main>
    )
}

export default Booking