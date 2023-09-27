import React from 'react';
import { Link } from 'react-router-dom';
import charcoals from "../../images/Charcoals.png";

function Recommend({ selectedLocation }) {
    const restaurantData = [
        { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
        { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
        { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
        { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
    ];

    return (
        <section className='recommend'>
            <div className='recommend-header'>
                <h1>Recommended restaurants in {selectedLocation}</h1>
                <Link to="">See All</Link>
            </div>
            <div className='recommend-container'>
                {restaurantData.map((restaurant, index) => (
                    <article className="restaurant" key={index}>
                        <div className="ratings">{restaurant.ratings}</div>
                        <img src={charcoals} alt='Restaurant' />
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.location}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Recommend;
