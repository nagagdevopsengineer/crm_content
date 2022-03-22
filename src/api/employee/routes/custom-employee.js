module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/employees/ed/:uuid',
        handler: 'employee.findEmployeeDetils',
      }
    ]
  }