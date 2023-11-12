import React from 'react'
import phone from "../../../images/phone.png";
import email from "../../../images/email.png";
import address from "../../../images/address.png";

function Contact({currentRestaurant}) {
    return (
        <section className='contact'>
            <h3>Contact</h3>
            <p>
                <img src={phone} alt='' />
                <span>{currentRestaurant.Phone_Number}</span>
            </p>
            <p>
                <img src={email} alt='' />
                <span>{currentRestaurant.Email_Address}</span>
            </p>
            <p>
                <img src={address} alt='' />
                <span>{currentRestaurant.Location}</span>
            </p>
            <h3>Directions</h3>
            <iframe
                src={currentRestaurant.Gmap}
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title='Restaurants Directions'
            />
        </section>
    )
}

export default Contact