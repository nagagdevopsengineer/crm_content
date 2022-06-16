module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/helpers/hd/:uuid',
        handler: 'helper.findHelperDetails',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/helpers/nmherpers/:contractorid',
        handler: 'helper.findAvailableHelpers',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/helpers/allcount',
        handler: 'helper.allHelper',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/helpers/contractorcount/:contid',
        handler: 'helper.contractorHelper',
      }
    ]
  }