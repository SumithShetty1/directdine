import React, { useState } from 'react'

function MyBookings() {
  const [selectedTab, setSelectedTab] = useState('today'); // Default selected tab

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

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
            <th>Restaurant Name <hr /></th>
            <th>Date <hr /></th>
            <th>Time <hr /></th>
            <th>Number of Guests <hr /></th>
            <th>Phone Number <hr /></th>
            <th>Status <hr /></th>
          </thead>
          <tbody>
            <tr className='primary-details'>
              <td className='username'>Charcoal's Family Restaurant</td>
              <td>12-11-2023</td>
              <td>12:00 pm</td>
              <td>24 Guests</td>
              <td>7676191166</td>
              <td>
                <p className='green'></p>
                <p className='red'></p>
              </td>
            </tr>
            <tr className='more-details'>
              <th>Date of Booking: </th>
              <td>01-11-2023</td>
              <th>Amount Paid: </th>
              <td>Rs. 100</td>
              <th>Special Request: </th>
              <td className='specialsreq'>Special Request is i want a omlet and fried rice and even a birthday cake</td>
            </tr>
            <tr>
              <td colSpan={6}>
                <hr />
              </td>
            </tr>
            <tr className='primary-details'>
              <td className='username'>Charcoal's Family Restaurant</td>
              <td>12-11-2023</td>
              <td>12:00 pm</td>
              <td>24 Guests</td>
              <td>7676191166</td>
              <td>
                <p className='green'></p>
                <p className='red'></p>
              </td>
            </tr>
            <tr className='more-details'>
              <th>Date of Booking: </th>
              <td>01-11-2023</td>
              <th>Amount Paid: </th>
              <td>Rs. 100</td>
              <th>Special Request: </th>
              <td className='specialsreq'>Special Request is i want a omlet and fried rice and even a birthday cake</td>
            </tr>
            <tr>
              <td colSpan={6}>
                <hr />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default MyBookings