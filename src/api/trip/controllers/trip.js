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

     
    }

}));
