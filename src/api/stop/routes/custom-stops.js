module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/stops/stopswithemployee/:routeid',
        handler: 'stop.findStopsByRouteWithEmpCount',
      }
    ]
  }