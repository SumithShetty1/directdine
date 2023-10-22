import React from 'react'
import phone from "../../../images/phone.png";
import email from "../../../images/email.png";
import address from "../../../images/address.png";

function Contact() {
    return (
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
    )
}

export default Contact