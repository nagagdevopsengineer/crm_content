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
      },
      // { // Path defined with a URL parameter
      //   method: 'GET',
      //   path: '/buses/allcount',
      //   handler: 'bus.allBus',
      // },
      {
        method: 'GET',
        path: '/buses/count/:clientid',
        handler: 'bus.buscountbyclient',
      },
       {// Path defined with a URL parameter
        method: 'GET',
        path: '/buses/allcount/:noid',
        handler: 'bus.allBuses',
      },
      {
        method: 'GET',
        path: '/buses/contractorcount/:contid',
        handler: 'bus.buscountbycontractor',
      },
    ]
  }