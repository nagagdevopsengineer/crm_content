module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/trips/ct',
        handler: 'trip.findCurrentTrips',
      }
    ]
  }