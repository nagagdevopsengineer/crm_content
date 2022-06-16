module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/drivers/dd/:uuid',
        handler: 'driver.findDriverDetils',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/drivers/nmdrivers/:contractorid',
        handler: 'driver.findAvailableDrivers',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/drivers/allcount',
        handler: 'driver.allDrivers',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/drivers/contractorcount/:contid',
        handler: 'driver.contractorDrivers',
      }
    ]
  }