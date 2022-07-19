module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/routes/client/all/:clientid',
        handler: 'route.byClientId',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/routes/nmroutebus/:clientid',
        handler: 'route.findAvailableRoutes',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/routes/allcount',
        handler: 'route.allRoute',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/routes/count/:clientid',
        handler: 'route.clientRoute',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/routes/monthcount',
        handler: 'route.monthCountRoute',
      },
     
    ]
  }