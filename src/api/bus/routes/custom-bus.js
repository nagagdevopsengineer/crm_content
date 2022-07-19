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
      {
        method: 'GET',
        path: '/buses/month',
        handler: 'bus.busByMonth',
      },
      {
        method: 'GET',
        path: '/buses/month/monthcount',
        handler: 'bus.busByMonthCount',
      },
      {
        method: 'GET',
        path: '/buses/customer/ratings',
        handler: 'bus.customerRating',
      },
      {
        method: 'GET',
        path: '/buses/employee/otps',
        handler: 'bus.otpData',
      },
      {
        method: 'GET',
        path: '/buses/employee/boarded',
        handler: 'bus.boardedEmp',
      },
      {
        method: 'GET',
        path: '/buses/employee/total/trips',
        handler: 'bus.totalEmployeeTrips',
      },
      {
        method: 'GET',
        path: '/buses/employee/timetrips',
        handler: 'bus.timelyTrips',
      },
      {
        method: 'GET',
        path: '/buses/allbuses/count/:clientid',
        handler: 'bus.allBusesbyClient',
      },
    ]
  }