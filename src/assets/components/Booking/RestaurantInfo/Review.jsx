import React, { useState } from 'react';
import profile from '../../../images/profile.png';
import starnotfilled from '../../../images/star-not-filled.png';
import starfilled from '../../../images/star-filled.png';
import downarrow from '../../../images/down-arrow.png';
import uparrow from '../../../images/up-arrow.png';

function Review() {
    const overallrating = 4.5;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleRatingChange = (newRating) => {
        if (newRating === rating) {
            // If the same star is clicked again, reset the rating to 0
            setRating(0);
        } else {
            // Otherwise, set the new rating
            setRating(newRating);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setReview('')
    }

    return (
        <section className='reviews'>
            <section className='reviewsheader'>
                <section className='overallratings'>
                    <h1>{overallrating}</h1>
                    <div className='rating-stars overallratingstars'>
                        {[1, 2, 3, 4, 5].map((starNumber) => (
                            <React.Fragment key={starNumber}>
                                <input
                                    type="checkbox"
                                    id={`overallstar${starNumber}`}
                                    checked={overallrating >= starNumber}
                                />
                                <label htmlFor={`overallstar${starNumber}`} className={`star${starNumber}`}>
                                    <img
                                        src={starnotfilled}
                                        alt=""
                                        className="starnotfilled"
                                    />
                                    <img
                                        src={starfilled}
                                        alt=""
                                        className="starfilled"
                                    />
                                </label>
                            </React.Fragment>
                        ))}
                    </div>
                    <p>20 reviews</p>
                </section>
                <hr />
                <section className='reviews-section'>
                    <div className='review-profile'>
                        <img src={profile} alt="" />
                        <h3>Sumith Shetty</h3>
                    </div>
                    <div className='rating-stars'>
                        {[1, 2, 3, 4, 5].map((starNumber) => (
                            <React.Fragment key={starNumber}>
                                <input
                                    type="checkbox"
                                    id={`star${starNumber}`}
                                    checked={rating >= starNumber}
                                    onChange={() => handleRatingChange(starNumber)}
                                />
                                <label htmlFor={`star${starNumber}`} className={`star${starNumber}`}>
                                    <img
                                        src={starnotfilled}
                                        alt=""
                                        className="starnotfilled"
                                    />
                                    <img
                                        src={starfilled}
                                        alt=""
                                        className="starfilled"
                                    />
                                </label>
                            </React.Fragment>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            id="review"
                            name="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder='Share details of your own experience at this place'
                            aria-label="Share details of your own experience at this place"
                            required
                        />
                        <input type='submit' value="Post" className='post-btn' />
                    </form>
                </section>
            </section>
            <section className='reviewcontainer'>
                <hr />
                <div className='customer-reviews'>
                    <div className='reviewed-profile'>
                        <img src={profile} alt="" />
                        <p>Sumith Shetty</p>
                        <p className='post-date'>12 Oct 2023</p>
                    </div>
                    <div className='reviewed-ratings'>
                        <img src={starfilled} alt="" />
                        <p>4</p>
                    </div>
                    <p>
                        It was good
                    </p>
                </div>
                <div className='customer-reviews'>
                    <div className='reviewed-profile'>
                        <img src={profile} alt="" />
                        <p>Sumith Shetty</p>
                        <p className='post-date'>12 Oct 2023</p>
                    </div>
                    <div className='reviewed-ratings'>
                        <img src={starfilled} alt="" />
                        <p>4</p>
                    </div>
                    <p>
                        It was good
                    </p>
                </div>
                <div className='customer-reviews'>
                    <div className='reviewed-profile'>
                        <img src={profile} alt="" />
                        <p>Sumith Shetty</p>
                        <p className='post-date'>12 Oct 2023</p>
                    </div>
                    <div className='reviewed-ratings'>
                        <img src={starfilled} alt="" />
                        <p>4</p>
                    </div>
                    <p>
                        It was good
                    </p>
                </div>
                <input type="checkbox" id="seemore" />
                <div className='see-more-reviews'>
                    <div className='customer-reviews'>
                        <div className='reviewed-profile'>
                            <img src={profile} alt="" />
                            <p>Sumith Shetty</p>
                            <p className='post-date'>12 Oct 2023</p>
                        </div>
                        <div className='reviewed-ratings'>
                            <img src={starfilled} alt="" />
                            <p>4</p>
                        </div>
                        <p>
                            It was good
                        </p>
                    </div>
                    <div className='customer-reviews'>
                        <div className='reviewed-profile'>
                            <img src={profile} alt="" />
                            <p>Sumith Shetty</p>
                            <p className='post-date'>12 Oct 2023</p>
                        </div>
                        <div className='reviewed-ratings'>
                            <img src={starfilled} alt="" />
                            <p>4</p>
                        </div>
                        <p>
                            It was good
                        </p>
                    </div>
                </div>
                <div className='seemore'>
                    <label htmlFor='seemore'>
                        <span className='downarrow'>
                            <p>See more</p>
                            <img src={downarrow} alt="" />
                        </span>
                        <span className='uparrow'>
                            <p>See less</p>
                            <img src={uparrow} alt="" />
                        </span>
                    </label>
                </div>
            </section>
        </section>
    );
}

export default Review;
