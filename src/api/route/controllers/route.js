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
    },
    async find(ctx) {
      // some custom logic here
      //ctx.query = { ...ctx.query, local: 'en' }
      
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
      var routIds = [];
      var data2 = data;

      for(let i=0; i< data2.length; i++) {
     console.log(data2[i].id);
          
      const stops = await strapi.entityService.findMany('api::stop.stop',{
          filters :{ 
              route :{ 
                id :  data2[i].id
              },
          },
          orderBy :{order:'asc'}
      });

      
      //element.attributes.route.data.stops = stops;
      data[i].stops = stops;


        };

    
      return { data, meta };
    },

    async allRoute(ctx) {
     
      const [entries, count] = await strapi.db.query('api::route.route').findWithCount({
        select: [],
      
      });
      console.log("count == ",count);
      return count;
    },
    async clientRoute(ctx) {
      const {clientid} = ctx.params;
      const [entries, count] = await strapi.db.query('api::route.route').findWithCount({
        select: [],
        where: { client:  {id : clientid} },
      });
      console.log("count == ",count);
      return count;
    }



}));
