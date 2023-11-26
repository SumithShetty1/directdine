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

    // State for rating and review
    const overallrating = currentRestaurant.Ratings;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    // Function to handle rating change
    const handleRatingChange = (newRating) => {
        if (newRating === rating) {
            // If the same star is clicked again, reset the rating to 0
            setRating(0);
        } else {
            // Otherwise, set the new rating
            setRating(newRating);
        }
    };

    // Function to handle form submission
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

    // State for reviews and show/hide logic
    const [reviews, setReviews] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(3); // Initial number of reviews to display

    // Effect to fetch reviews based on restaurant email
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

    // Function to toggle reviews visibility
    const toggleReviews = () => {
        setShowMore(!showMore);
        setVisibleReviews(showMore ? 3 : reviews.length);
    };

    return (
        <section className='reviews'>
            <section className='reviewsheader'>
                {/* Overall Ratings Section */}
                <section className='overallratings'>
                    <h1>{overallrating}</h1>
                    {/* Displaying Overall Ratings with Stars */}
                    <div className='rating-stars overallratingstars'>
                        {[1, 2, 3, 4, 5].map((starNumber) => (
                            <React.Fragment key={starNumber}>
                                {/* Checkbox to display filled/unfilled stars based on overall rating */}
                                <input
                                    type="checkbox"
                                    id={`overallstar${starNumber}`}
                                    checked={overallrating >= starNumber}
                                    disabled
                                />
                                {/* Star Icons */}
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
                {/* Reviews Section */}
                <section className='reviews-section'>
                    {/* User Review Form */}
                    <div className='review-profile'>
                        {/* Display User Profile (if available) */}
                        {user && user.photoURL && (
                            <img src={user.photoURL} alt="" />
                        )}
                        {user && user.displayName && (
                            <h3>{user.displayName}</h3>
                        )}
                    </div>
                    {/* User Rating Input */}
                    <div className='rating-stars'>
                        {[1, 2, 3, 4, 5].map((starNumber) => (
                            <React.Fragment key={starNumber}>
                                {/* Checkbox to select user rating */}
                                <input
                                    type="checkbox"
                                    id={`star${starNumber}`}
                                    checked={rating >= starNumber}
                                    onChange={() => handleRatingChange(starNumber)}
                                />
                                {/* Star Icons */}
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
                    {/* Form for Posting Reviews */}
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
            {/* Container for Displaying Reviews */}
            <section className='reviewcontainer'>
                <hr />
                {/* Displaying Reviews */}
                {reviews.slice(0, visibleReviews).map((review, index) => (
                    <div key={index} className='customer-reviews'>
                        {/* User Profile and Posted Date */}
                        <div className='reviewed-profile'>
                            <img src={review.profileUrl} alt="" />
                            <p>{review.name}</p>
                            <p className='post-date'>{formatDate(review.currentDate)}</p>
                        </div>
                        {/* User Ratings */}
                        <div className='reviewed-ratings'>
                            <img src={starfilled} alt="" />
                            <p>{review.rating}</p>
                        </div>
                        {/* User Comments/Review */}
                        <p>{review.comments}</p>
                    </div>
                ))}
                {/* 'See More' Section */}
                {reviews.length > 3 && (
                    <div className='seemore'>
                        <label htmlFor='seemore' onClick={toggleReviews}>
                            <span className='downarrow'>
                                {/* Toggle for 'See More' or 'See Less' */}
                                <p>{showMore ? 'See less' : 'See more'}</p>
                                {/* Arrow Icon for Indicating Expand/Collapse */}
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
