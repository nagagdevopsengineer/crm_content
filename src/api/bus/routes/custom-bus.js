module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/buses/nmbusesdriver/:contractorid',
        handler: 'bus.findAvailableBuses',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/buses/nmbusesroutes/:contractorid',
        handler: 'bus.findAvailableBusesForRoutes',
      }
    ]
  }