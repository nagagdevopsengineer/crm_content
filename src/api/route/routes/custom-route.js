module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/routes/nmroutebus/:contractorid',
        handler: 'route.findAvailableRoutes',
      }
    ]
  }