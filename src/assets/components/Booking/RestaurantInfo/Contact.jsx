import React from 'react';
import phone from '../../../images/phone.png';
import email from '../../../images/email.png';
import address from '../../../images/address.png';

function Contact({ currentRestaurant }) {
    // Display contact information and restaurant location
    return (
        <section className='contact'>
            {/* Contact details */}
            <h3>Contact</h3>
            {/* Phone number */}
            <p>
                <img src={phone} alt='' />
                <span>{currentRestaurant.Phone_Number}</span>
            </p>
            {/* Email */}
            <p>
                <img src={email} alt='' />
                <span>{currentRestaurant.Email_Address}</span>
            </p>
            {/* Address */}
            <p>
                <img src={address} alt='' />
                <span>{currentRestaurant.Location}</span>
            </p>

            {/* Directions */}
            <h3>Directions</h3>
            {/* Google Maps iframe for showing restaurant location */}
            <iframe
                src={currentRestaurant.Gmap}
                style={{ border: '0' }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Restaurants Directions'
            />
        </section>
    );
}

export default Contact;
