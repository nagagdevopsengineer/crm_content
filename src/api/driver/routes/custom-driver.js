module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/drivers/dd/:uuid',
        handler: 'driver.findDriverDetils',
      }
    ]
  }