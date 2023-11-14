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
        const colRef = collection(db, 'Reservations'); // Replace with your collection name

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
    <h1>{restaurantName}</h1>
    <section className='info-reservations'>
      <input
        type="radio"
        id="todaycheck"
        name="info-tabs"
        value="today"
        checked={selectedTab === 'today'}
        onChange={() => handleTabChange('today')}
      />
      <label htmlFor="todaycheck">Today</label>
      <input
        type="radio"
        id="weekcheck"
        name="info-tabs"
        value="week"
        checked={selectedTab === 'week'}
        onChange={() => handleTabChange('week')}
      />
      <label htmlFor="weekcheck">This Week</label>
      <input
        type="radio"
        id="monthcheck"
        name="info-tabs"
        value="month"
        checked={selectedTab === 'month'}
        onChange={() => handleTabChange('month')}
      />
      <label htmlFor="monthcheck">This Month</label>
      <input
        type="radio"
        id="allcheck"
        name="info-tabs"
        value="all"
        checked={selectedTab === 'all'}
        onChange={() => handleTabChange('all')}
      />
      <label htmlFor="allcheck">All Reservations</label>
    </section>
    <section className='info-reservation-container'>
      <table>
        <thead>
          <tr>
            <th>Name <hr /></th>
            <th>Date <hr /></th>
            <th>Time <hr /></th>
            <th>Number of Guests <hr /></th>
            <th>Phone Number <hr /></th>
            <th>Status <hr /></th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <React.Fragment key={index}>
              <tr className='primary-details'>
                <td className='username'>{reservation.username}</td>
                <td>{formatDateToDDMMYYYY(reservation.date)}</td>
                <td>{reservation.time}</td>
                <td>{reservation.diners}</td>
                <td>{reservation.phone}</td>
                <td>
                  <p>{status[index]}</p>
                </td>
              </tr>
              <tr className='more-details'>
                <th>Date of Booking:</th>
                <td>{formatDateToDDMMYYYY(reservation.currentdate)}</td>
                <th>Amount Paid:</th>
                <td>{reservation.price}</td>
                <th>Special Request:</th>
                <td className='specialsreq'>{reservation.special || 'No special requests'}</td>
              </tr>
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