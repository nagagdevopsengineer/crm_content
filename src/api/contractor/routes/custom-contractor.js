module.exports = {
    routes: [
     
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/contractor/count/:clientid',
        handler: 'contractor.contractorCount',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/contractor/allcount',
        handler: 'contractor.contractorAllCount',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/contractor/:clientid',
        handler: 'contractor.contractorByClient',
      },

     
    ]
  }