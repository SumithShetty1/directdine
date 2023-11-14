import React, { useState, useEffect } from 'react';
import starnotfilled from '../../../images/star-not-filled.png';
import starfilled from '../../../images/star-filled.png';
import downarrow from '../../../images/down-arrow.png';
import uparrow from '../../../images/up-arrow.png';
import { UserAuth } from '../../../../context/AuthContext';
import { getDocs, collection, getFirestore, addDoc, query, where, doc, updateDoc } from 'firebase/firestore';

// Function to format date as DD-MM-YYYY
const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

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
            alert('Please log in to post a review.');
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
            alert('Thank you for your reviews');

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
            const restaurantDocRef = doc(db, 'Restaurants Details', currentRestaurant.id);
            await updateDoc(restaurantDocRef, {
                Ratings: newOverallRating,
            });
            console.log('Overall rating updated successfully!');
        } catch (error) {
            console.error('Error adding review: ', error);
        }
    };

    const [reviews, setReviews] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(3); // Initial number of reviews to display

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const db = getFirestore();
                const reviewsCollection = collection(db, 'Reviews');

                // Query reviews based on the restaurant's email address
                const q = query(reviewsCollection, where('restaurantEmail', '==', currentRestaurant.Email_Address));
                const querySnapshot = await getDocs(q);

                const reviewsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReviews(reviewsData);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        if (currentRestaurant && currentRestaurant.Email_Address) {
            fetchReviews();
        }
    }, [currentRestaurant]);

    const toggleReviews = () => {
        setShowMore(!showMore);
        setVisibleReviews(showMore ? 3 : reviews.length);
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
                                    disabled
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
                        {user && user.photoURL && (
                            <img src={user.photoURL} alt="" />
                        )}
                        {user && user.displayName && (
                            <h3>{user.displayName}</h3>
                        )}
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
                {reviews.slice(0, visibleReviews).map((review, index) => (
                    <div key={index} className='customer-reviews'>
                        <div className='reviewed-profile'>
                            <img src={review.profileUrl} alt="" />
                            <p>{review.name}</p>
                            <p className='post-date'>{formatDate(review.currentDate)}</p>
                        </div>
                        <div className='reviewed-ratings'>
                            <img src={starfilled} alt="" />
                            <p>{review.rating}</p>
                        </div>
                        <p>{review.comments}</p>
                    </div>
                ))}
                {reviews.length > 3 && (
                    <div className='seemore'>
                        <label htmlFor='seemore' onClick={toggleReviews}>
                            <span className='downarrow'>
                                <p>{showMore ? 'See less' : 'See more'}</p>
                                <img src={showMore ? uparrow : downarrow} alt="" />
                            </span>
                        </label>
                    </div>
                )}
            </section>
        </section>
    );
}

export default Review;
