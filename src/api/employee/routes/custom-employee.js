module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/employees/ed/:uuid',
        handler: 'employee.findEmployeeDetils',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/employees/previoustrips/:uuid',
        handler: 'employee.findPreviousTrips',
      }
    ]
  }