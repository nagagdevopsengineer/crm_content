'use strict';

/**
 *  driver controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
module.exports = createCoreController('api::driver.driver', ({ env }) =>  ({
    
    async create(ctx) {
      
        const userObj = {firstName:"", lastName :"",email:"",login:"",password:"",mobile:0,authorities:[]};

        userObj.email= ctx.request.body.data.email;
        userObj.login= ctx.request.body.data.email;
        userObj.firstName = ctx.request.body.data.name;
        userObj.lastName = ctx.request.body.data.name;
        userObj.password = 'temp';
        userObj.mobile = ctx.request.body.data.mobile;
        userObj.authorities = ["ROLE_DRIVER"];  
        const API_URL = strapi.config.get('remote.remotehost')+ ":"+strapi.config.get('remote.port')
        +strapi.config.get('remote.userapi');
       
      await  axios.post(API_URL , userObj)
        .catch((error) => {
            console.log(" exception  ",error);
            return  Promise.reject(error);
        }).then(function(dataUser){

            console.log("  response from user mgmt ==== >> ",dataUser);
            ctx.request.body.data.uid = dataUser.data.userId;
            //updateObj.attributes.uuid=dataUser.data.userId; 
        });

        const response = await super.create(ctx);
    
        return response;
      },

async findDriverDetils(ctx){

  const { uuid } = ctx.params;



var dataRes = {};


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


/**const routeEmployees = await strapi.entityService.findMany('api::employee.employee',{
  filters:{
    route:{
    id:routeBuses[0].route.id
  },
}
});**/

var todayDate = new Date().toISOString().slice(0, 10);
console.log(todayDate);
const routeTrip = await strapi.entityService.findMany('api::trip.trip',{
  filters:{
  route_bus :{
    id:routeBuses[0].id
  },
      tripdate:{
        $gte : todayDate
      },
      isended:{
        $eq : false
      }
},
orderBy: { id: 'asc' },
poplate : {trip:true}
});

console.log(" trips   ",routeTrip);
if(routeTrip != null && routeTrip != undefined && routeTrip.length > 0){
const routeEmployees = await strapi.entityService.findMany('api::employeeotp.employeeotp',{
  filters:{
    trip:{
    id:routeTrip[0].id
  }
},
populate:{employee:{populate:'*'}}
});
dataRes.commuters = routeEmployees;

const newPassangers = await strapi.entityService.findMany('api::newpassenger.newpassenger',{
  filters:{
    trip:{
    id:routeTrip[0].id
  },
}
});

dataRes.addedPax = newPassangers;

}


dataRes.driver = entry[0];
dataRes.bus = driverBuses[0].bus;
dataRes.route = routeBuses[0].route;
dataRes.stops = routeStops;
dataRes.trips = routeTrip;
dataRes.currentTrip = routeTrip[0];


console.log(dataRes);
const { data, meta } = dataRes ;

return dataRes;

},

async findAvailableDrivers(ctx){

  const { contractorid } = ctx.params;

  const mappedDriversAndHelpers = await strapi.entityService.findMany('api::bus-driver.bus-driver',  {
    filters:{
      driver:{
        contractor:{
         id:contractorid
        }
    }
  },
    populate : {driver:true, helper:true}
  });

  let drivers = [];
  let helpers = [];
  await    mappedDriversAndHelpers.forEach(element => {
  
    drivers.push(element.driver.id);
    helpers.push(element.helper.id);

  });
  

  const availableDrivers  = await strapi.entityService.findMany('api::driver.driver',  {
    filters:{

      contractor:{
        id:contractorid
      },

      id:{
        $notIn : drivers
      }

    }
  });

return availableDrivers;
}

}));
