import React, { useState, useEffect } from 'react';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';
import '../styles/Reservations.css';

function Reservations() {
  const [selectedTab, setSelectedTab] = useState('today');
  const [reservationsData, setReservationsData] = useState([]);
  const [displayedReservations, setDisplayedReservations] = useState([]);
  const [status, setStatus] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const { user } = UserAuth();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, 'Reservations');

        const querySnapshot = await getDocs(colRef);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        setReservationsData(data);

        // Find a reservation matching the user's email and set the restaurant name
        const userReservation = data.find((reservation) => reservation.email === user.email);
        if (userReservation) {
          setRestaurantName(userReservation.rname);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user.email]);

  useEffect(() => {
    const determineFilteredReservations = () => {
      const currentDate = new Date();
      const filteredReservations = reservationsData.filter((reservation) => {
        const reservationDate = new Date(reservation.date);

        if (selectedTab === 'today') {
          return (
            reservationDate.getDate() === currentDate.getDate() &&
            reservationDate.getMonth() === currentDate.getMonth() &&
            reservationDate.getFullYear() === currentDate.getFullYear()
          );
        } else if (selectedTab === 'week') {
          const today = new Date();
          const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
          const lastDayOfWeek = new Date(firstDayOfWeek);
          lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

          return reservationDate >= firstDayOfWeek && reservationDate <= lastDayOfWeek;
        } else if (selectedTab === 'month') {
          return (
            reservationDate.getMonth() === currentDate.getMonth() &&
            reservationDate.getFullYear() === currentDate.getFullYear()
          );
        }
        return true; // For 'all' tab or default case
      });

      filteredReservations.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB - dateA;
      });

      const statuses = filteredReservations.map((reservation) => {
        const reservationDate = new Date(reservation.date);
        const reservationTime = new Date(`${reservation.date} ${reservation.time}`);
        const oneHourLater = new Date(reservationTime.getTime() + 60 * 60 * 1000);
        if (reservationDate > currentDate || oneHourLater > currentDate) {
          return '🟢';
        } else if (
          reservationDate.getDate() === currentDate.getDate() &&
          reservationDate.getMonth() === currentDate.getMonth() &&
          reservationDate.getFullYear() === currentDate.getFullYear()
        ) {
          return '🟡';
        } else {
          return '🔴';
        }
      });

      setStatus(statuses);
      setDisplayedReservations(filteredReservations);
    };

    determineFilteredReservations();
  }, [reservationsData, selectedTab]);

  const filteredReservations = displayedReservations.filter(
    (reservation) => reservation.email === user.email
  );

  return (
    <main className='reservationsmain'>
      {/* Section for radio buttons to select tab */}
      <section className='info-reservations'>
        {/* Radio button for 'Today' */}
        <input
          type="radio"
          id="todaycheck"
          name="info-tabs"
          value="today"
          checked={selectedTab === 'today'}
          onChange={() => handleTabChange('today')}
        />
        <label htmlFor="todaycheck">Today</label>

        {/* Radio button for 'This Week' */}
        <input
          type="radio"
          id="weekcheck"
          name="info-tabs"
          value="week"
          checked={selectedTab === 'week'}
          onChange={() => handleTabChange('week')}
        />
        <label htmlFor="weekcheck">This Week</label>

        {/* Radio button for 'This Month' */}
        <input
          type="radio"
          id="monthcheck"
          name="info-tabs"
          value="month"
          checked={selectedTab === 'month'}
          onChange={() => handleTabChange('month')}
        />
        <label htmlFor="monthcheck">This Month</label>

        {/* Radio button for 'All Bookings' */}
        <input
          type="radio"
          id="allcheck"
          name="info-tabs"
          value="all"
          checked={selectedTab === 'all'}
          onChange={() => handleTabChange('all')}
        />
        <label htmlFor="allcheck">All Bookings</label>
      </section>

      {/* Section to display reservation details in a table */}
      <section className='info-reservation-container'>
        <table>
          <thead>
            {/* Table headers */}
            <tr>
              <th>Restaurant Name <hr /></th>
              <th>Date <hr /></th>
              <th>Time <hr /></th>
              <th>Number of Guests <hr /></th>
              <th>Phone Number <hr /></th>
              <th>Status <hr /></th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through displayed reservations to render details */}
            {filteredReservations.map((booking, index) => (
              <React.Fragment key={index}>
                {/* Primary details row */}
                <tr className='primary-details'>
                  <td className='username'>{booking.rname}</td>
                  <td>{formatDateToDDMMYYYY(booking.date)}</td>
                  <td>{booking.time}</td>
                  <td>{booking.diners} Guests</td>
                  <td>{booking.phone}</td>
                  <td>
                    <span>{status[index]}</span>
                  </td>
                </tr>
                {/* More details row */}
                <tr className='more-details'>
                  <th>Date of Booking:</th>
                  <td>{formatDateToDDMMYYYY(booking.currentdate)}</td>
                  <th>Amount Paid:</th>
                  <td>{booking.price}</td>
                  <th>Special Request:</th>
                  <td className='specialsreq'>{booking.special || 'No special requests'}</td>
                </tr>
                {/* Divider */}
                <tr>
                  <td colSpan={6}>
                    <hr />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default Reservations