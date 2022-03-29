module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/helpers/hd/:uuid',
        handler: 'helper.findHelperDetails',
      }
    ]
  }