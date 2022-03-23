'use strict';

/**
 *  trip controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const uuid = require('uuid');

module.exports = createCoreController('api::trip.trip', ({ env }) =>  ({
    
    async create(ctx) {

       console.log(" Creating trips  ",ctx);
       const map1 = new Map();
       const entry =   await strapi.entityService.findMany('api::route-bus.route-bus',{
            populate: ['route','bus']
        });

        let busIds = [];
        let routeBus = "";
    await    entry.forEach(element => {

            if(element.bus != undefined && element.bus.id != null 
                && element.route != undefined 
                && element.route.id != null)
            {
            map1.set(element.bus.id,element.route.id);
            }
          });


      await    map1.forEach(async(values,keys)=>{
           

            console.log(values , "  values   ",keys);

            const busDriver =  await strapi.entityService.findMany('api::bus-driver.bus-driver',
            {
            filters: {
             bus:{
                 id:{
                   $eq: keys
                 }
             }
            },
            populate: ['bus','driver','helper']
          });

          const route =  await strapi.entityService.findMany('api::route.route',
            {
            filters: {
                 id:{
                   $eq: values
             }
            }
          });

          let trip = {
              tripdate : new Date(),
              uuid : uuid(),
              bus : busDriver.bus,
              driver : busDriver.driver,
              helper : busDriver.helper,
              route : route
         
    };

        console.log(" at last 1");
  
        const response =  await strapi.service('api::trip.trip').create(trip); 
        
        console.log(" at last 2 ");

        return response;


          });

     
    },

    async findCurrentTrips(ctx){

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
               },
               isstarted :{
                 $eq:true
               }
 
}  ,

 populate:{ route_bus: {
   populate :{route:true,bus:{
     populate :{driver:true,helper:true}
   }
  }
 } ,
 bus_driver :{
   populate:{driver:true,helper:true}
 }

}

     });

   /** const driverBuses = await strapi.entityService.findMany('api::bus-driver.bus-driver',{
      filters:{
        bus:{
        id:routeTrip[0].route_bus.bus.id
      },
    },
    populate :  { driver:true,helper:true}
    }); **/

    

     console.log("  current tirps   ",routeTrip);

     return routeTrip;

    },
async findTripById(ctx){

  const { id } = ctx.params;
  console.log(" id ",id);
  const trip =    await strapi.entityService.findOne('api::trip.trip',id,{
    populate:{ route_bus: {
      populate :{route:true,bus:{
        populate :{driver:true,helper:true}
      }
     }
    } ,
    bus_driver :{
      populate:{driver:true,helper:true}
    }
  }

  });

return trip;
}


}));
