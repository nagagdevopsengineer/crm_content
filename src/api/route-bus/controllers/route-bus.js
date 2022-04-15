'use strict';

/**
 *  route-bus controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('api::route-bus.route-bus');
module.exports = createCoreController('api::route-bus.route-bus', ({ env }) =>  ({

    async find(ctx) {
        // some custom logic here
        //ctx.query = { ...ctx.query, local: 'en' }
        
        // Calling the default core action
        const { data, meta } = await super.find(ctx);
        var routIds = [];
        var data2 = data;

        for(let i=0; i< data2.length; i++) {
       console.log(data2[i].attributes.route.data.id);
            
        const stops = await strapi.entityService.findMany('api::stop.stop',{
            filters :{ 
                route :{ 
                  id :  data2[i].attributes.route.data.id 
                },
            },
            orderBy :{order:'asc'}
        });
  
        
        //element.attributes.route.data.stops = stops;
        data[i].attributes.route.data.stops = stops;

  
          };

      
        return { data, meta };
      },
  


}));

