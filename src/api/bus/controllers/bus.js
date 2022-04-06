'use strict';

/**
 *  bus controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bus.bus', ({ env }) =>  ({

    async findAvailableBuses(ctx) {

        const { contractorid } = ctx.params;

        const mappedDriversAndHelpersBuses = await strapi.entityService.findMany('api::bus-driver.bus-driver',  {
          filters:{
            driver:{
              contractor:{
               id:contractorid
              }
          }
        },
          populate : {bus:true}
        });
      
        let buses = [];
        
        await    mappedDriversAndHelpersBuses.forEach(element => {
        
            buses.push(element.bus.id);
        
        });
        
      
        const avaialbeBuses  = await strapi.entityService.findMany('api::bus.bus',  {
          filters:{
      
            contractor:{
              id:contractorid
            },
      
            id:{
              $notIn : buses
            }
      
          }
        });
      
      return avaialbeBuses;

    },
    async findAvailableBusesForRoutes(ctx){


        const { contractorid } = ctx.params;

        const mappedRoutesAndBuses = await strapi.entityService.findMany('api::route-bus.route-bus',  {
          filters:{
            bus:{
              contractor:{
               id:contractorid
              }
          }
        },
          populate : {bus:true}
        });
      
        let buses = [];
        
        await    mappedRoutesAndBuses.forEach(element => {
        
            buses.push(element.bus.id);
        
        });
        
      
        const avaialbeBuses  = await strapi.entityService.findMany('api::bus.bus',  {
          filters:{
      
            contractor:{
              id:contractorid
            },
      
            id:{
              $notIn : buses
            }
      
          }
        });
      
      return avaialbeBuses;
    }

    })
    );
