'use strict';

/**
 *  route controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::route.route', ({ env }) =>  ({

     async findAvailableRoutes(ctx){
        const { clientid } = ctx.params;

        const mappedRoutesAndBuses = await strapi.entityService.findMany('api::route-bus.route-bus',  {
          filters:{
            route:{
              client:{
               id:clientid
              }
          }
        },
          populate : {route:true}
        });
      
        let routes = [];
        
        await    mappedRoutesAndBuses.forEach(element => {
        
            routes.push(element.route.id);
        
        });
        
      
        const avaialbeRoutes  = await strapi.entityService.findMany('api::route.route',  {
          filters:{
      
            client:{
              id:clientid
            },
      
            id:{
              $notIn : routes
            }
      
          }
        });
      
      return avaialbeRoutes;
    }



}));
