import React, { useState } from 'react';
import profile from '../../../images/profile.png';
import starnotfilled from '../../../images/star-not-filled.png';
import starfilled from '../../../images/star-filled.png';
import downarrow from '../../../images/down-arrow.png';
import uparrow from '../../../images/up-arrow.png';
import { UserAuth } from '../../../../context/AuthContext';
import { getDocs, collection, getFirestore, addDoc, query, where, doc, updateDoc } from 'firebase/firestore';

function Review({ currentRestaurant }) {
    const { user } = UserAuth();

    const overallrating = currentRestaurant.Ratings;
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            // Show an alert if the user is not logged in
            alert('Please log in to make a reservation.');
            return;
        }

        try {
            const db = getFirestore();
            const reviewsCollectionRef = collection(db, 'Reviews');

            const reviewData = {
                name: user.displayName,
                restaurantEmail: currentRestaurant.Email_Address,
                rating: rating,
                comments: review,
                profileUrl: user.photoURL,
                currentDate: new Date().toISOString(),
            };

            // Add the new review to the 'Reviews' collection
            await addDoc(reviewsCollectionRef, reviewData);
            console.log('Review submitted successfully!');
            setRating(0);
            setReview('');

            // Fetch all reviews for this restaurant
            const querySnapshot = await getDocs(
                query(collection(db, 'Reviews'), where('restaurantEmail', '==', currentRestaurant.Email_Address))
            );

            let totalRating = 0;
            let totalReviews = 0;

            querySnapshot.forEach((doc) => {
                const review = doc.data();
                totalRating += review.rating;
                totalReviews++;
            });

            // Calculate the new overall rating
            const newOverallRating = totalRating / totalReviews;

            // Update 'Restaurants Details' with the new overall rating
            const restaurantDocRef = doc(db, 'Restaurants Details', currentRestaurant.id);console.log(currentRestaurant.id)
            await updateDoc(restaurantDocRef, {
                Ratings: newOverallRating,
            });
            console.log('Overall rating updated successfully!');
        } catch (error) {
            console.error('Error adding review: ', error);
        }
    };

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
