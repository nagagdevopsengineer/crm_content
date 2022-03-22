'use strict';

/**
 *  driver controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
module.exports = createCoreController('api::driver.driver', ({ env }) =>  ({
    
    async create(ctx) {
       
        const response = await super.create(ctx);
    
        const userObj = {firstName:"", lastName :"",email:"",login:"",password:"",mobile:0,authorities:[]};

        userObj.email= response.data.attributes.email;
        userObj.login= response.data.attributes.email;
        userObj.firstName = response.data.attributes.name;
        userObj.lastName = response.data.attributes.name;
        userObj.password = 'temp';
        userObj.mobile = response.data.attributes.mobile;
        userObj.authorities = ["ROLE_DRIVER"];  
        const API_URL = strapi.config.get('remote.remotehost')+ ":"+strapi.config.get('remote.port')
        +strapi.config.get('remote.userapi');
        var updateObj = response.data;
      await  axios.post(API_URL , userObj)
        .catch((error) => {
            console.log(" exception  ",error);
        }).then(function(dataUser){

            console.log("  response from user mgmt ==== >> ",dataUser);
           
            updateObj.attributes.uuid=dataUser.data.userId;
            

          
        });


        const entry = await strapi.entityService.update('api::driver.driver', response.data.id  , {
            data: {
              uuid : updateObj.attributes.uuid,
            },
          });

        console.log("     updated response  response ",response);
        return response;
      },

async findDriverDetils(ctx){

  const { uuid } = ctx.params;

  const entry = await strapi.entityService.findMany('api::driver.driver',  {
    filters: { uid : uuid }
    
  });

const driverBuses = await strapi.entityService.findMany('api::bus-driver.bus-driver',{
  filters:{
    driver:{
    id:entry[0].id
  },
},
populate :  { bus:true}
});

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


const routeEmployees = await strapi.entityService.findMany('api::employee.employee',{
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
      }
}
});




console.log(" routeTrip " , routeTrip);



var dataRes = {};

dataRes.driver = entry[0];
dataRes.bus = driverBuses[0].bus;
dataRes.route = routeBuses[0].route;
dataRes.stops = routeStops;
dataRes.trips = routeTrip;
dataRes.commuters = routeEmployees;
console.log(dataRes);
const { data, meta } = dataRes ;

return dataRes;

}

}));
