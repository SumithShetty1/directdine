import React, { useState, useEffect } from 'react';
import { query, where, getDocs, collection, getFirestore } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';

function MyBookings() {
  const [selectedTab, setSelectedTab] = useState('today');
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

  const { user } = UserAuth();
  const [reservationsData, setReservationsData] = useState([]);
  const [displayedReservations, setDisplayedReservations] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, 'Reservations');
        const querySnapshot = await getDocs(query(colRef, where('userEmail', '==', user.email)));

        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        setReservationsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user && user.email) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    const determineFilteredReservations = () => {
      const currentDate = new Date();
      const filteredReservations = reservationsData.filter((booking) => {
        const bookingDate = new Date(booking.date);

        if (selectedTab === 'today') {
          return (
            bookingDate.getDate() === currentDate.getDate() &&
            bookingDate.getMonth() === currentDate.getMonth() &&
            bookingDate.getFullYear() === currentDate.getFullYear()
          );
        } else if (selectedTab === 'week') {
          const today = new Date();
          const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
          const lastDayOfWeek = new Date(firstDayOfWeek);
          lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

          return bookingDate >= firstDayOfWeek && bookingDate <= lastDayOfWeek;
        } else if (selectedTab === 'month') {
          return (
            bookingDate.getMonth() === currentDate.getMonth() &&
            bookingDate.getFullYear() === currentDate.getFullYear()
          );
        }
        return true; // For 'all' tab or default case
      });

      filteredReservations.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB - dateA;
      });

      const statuses = filteredReservations.map((booking) => {
        const bookingDate = new Date(booking.date);
        const bookingTime = new Date(`${booking.date} ${booking.time}`);
        const oneHourLater = new Date(bookingTime.getTime() + 60 * 60 * 1000);

        if (bookingDate > currentDate || oneHourLater > currentDate) {
          return '🟢';
        } else if (
          bookingDate.getDate() === currentDate.getDate() &&
          bookingDate.getMonth() === currentDate.getMonth() &&
          bookingDate.getFullYear() === currentDate.getFullYear()
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

  return (
    <main className='reservationsmain'>
      <h1>My Bookings</h1>
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
        <label htmlFor="allcheck">All Bookings</label>
      </section>
      <section className='info-reservation-container'>
        <table>
          <thead>
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
            {displayedReservations.map((booking, index) => (
              <React.Fragment key={index}>
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
                <tr className='more-details'>
                  <th>Date of Booking:</th>
                  <td>{formatDateToDDMMYYYY(booking.currentdate)}</td>
                  <th>Amount Paid:</th>
                  <td>{booking.price}</td>
                  <th>Special Request:</th>
                  <td className='specialsreq'>{booking.special || 'No special requests'}</td>
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

export default MyBookings