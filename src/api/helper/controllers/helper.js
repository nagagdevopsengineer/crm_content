'use strict';

/**
 *  helper controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
module.exports = createCoreController('api::helper.helper', ({ env }) =>  ({
    
    async create(ctx) {
       
        
    
        const userObj = {firstName:"", lastName :"",email:"",login:"",password:"",mobile:0,authorities:[]};

        userObj.email= ctx.request.body.data.email;
        userObj.login= ctx.request.body.data.email;
        userObj.firstName = ctx.request.body.data.name;
        userObj.lastName = ctx.request.body.data.name;
        userObj.mobile = ctx.request.body.data.contact_number;
        userObj.password = 'temp';
        userObj.authorities = ["ROLE_HELPER"];  
        const API_URL = strapi.config.get('remote.remotehost')+ ":"+strapi.config.get('remote.port')
        +strapi.config.get('remote.userapi');
       
      await  axios.post(API_URL , userObj)
        .catch((error) => {
            console.log(" exception  ",error);
            return  Promise.reject(error);
        }).then(function(dataUser){

            console.log("  response from user mgmt ==== >> ",dataUser);
            ctx.request.body.data.uuid = dataUser.data.userId;
           // updateObj.attributes.uuid=dataUser.data.userId;
        });

        const response = await super.create(ctx);
        return response;
      },

      async findHelperDetails(ctx){

  const { uuid } = ctx.params;

  console.log(" sdsdfdsfdsf ",uuid);

  const entry = await strapi.entityService.findMany('api::helper.helper',  {
    filters: { uuid : uuid }
    
  });

const driverBuses = await strapi.entityService.findMany('api::bus-driver.bus-driver',{
  filters:{
    helper:{
    id:entry[0].id
  },
},
populate :  { bus:true}
});

console.log("  a  sdfsfdasd ",driverBuses)

const routeBuses = await strapi.entityService.findMany('api::route-bus.route-bus',{
  filters:{
    bus:{
    id:driverBuses[0].bus.id
  },
},
populate :  {route:true}
});

console.log(routeBuses[0].id , " ..... routeBuses ",routeBuses);

const routeStops = await strapi.entityService.findMany('api::stop.stop',{
  filters:{
    route:{
    id:routeBuses[0].route.id
  },
}
});



var todayDate = new Date().toISOString().slice(0, 10);
console.log(todayDate);
const routeTrip = await strapi.entityService.findMany('api::trip.trip',{
  filters:{
 /**  'route-bus' :{
    id:routeBuses[0].id
  },*/
      tripdate:{
        $gte : todayDate
      },
      isended:{
        $eq : false
      }

},
orderBy: { id: 'asc' },
});




console.log(" routeTrip " , routeTrip);



var dataRes = {};

dataRes.helper = entry[0];
dataRes.bus = driverBuses[0].bus;
dataRes.route = routeBuses[0].route;
dataRes.stops = routeStops;
dataRes.trips = routeTrip;
dataRes.currentTrip = routeTrip[0];

return dataRes;
      }

}));

