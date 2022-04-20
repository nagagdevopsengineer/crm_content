module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/trips/ct/:clientId',
        handler: 'trip.findCurrentTrips',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/trips/trip/:id',
        handler: 'trip.findTripById',
      },
      { // Path defined with a URL parameter
        method: 'PUT',
        path: '/trips/starttrip/:id',
        handler: 'trip.updateStartTrip',
      },
      { // Path defined with a URL parameter
        method: 'PUT',
        path: '/trips/endtrip/:id',
        handler: 'trip.endTrip',
      },
      { // Path defined with a URL parameter
        method: 'POST',
        path: '/trips/createtrip/:driveid',
        handler: 'trip.createTrip',
      }
    ]
  }