module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/supportticket/ticketdetails/:id',
        handler: 'supportticket.ticketdetails',
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/supportticket/getTickets/:email',
        handler: 'supportticket.getTickets',
      }
    ]
  }