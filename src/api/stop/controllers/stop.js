'use strict';

/**
 *  stop controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stop.stop', ({ env }) =>  ({

async findStopsByRouteWithEmpCount(ctx){

    const { routeid } = ctx.params;
    var resArray = [];

    const stops = await strapi.entityService.findMany('api::stop.stop',  {
       
        filters:{
          route:{
             id:routeid
        }
      },
        orderBy: { order: 'asc' },
      });

      for(var i =0 ; i<stops.length-1;i++){
       var stopid = stops[i].id;
        var stop = stops[i];
      await strapi.entityService.findMany('api::employee.employee',{
       
        filters:{stop:{id:stopid}},
         
      }).then((entries) => {
        console.log( stopid,"employee count == >>" ,entries.length);
        stop.passengers = entries.length;
        resArray.push(stop);
        /*...*/
    }).catch((error) =>{

        console.log( "employee count error== >>" ,error);

    });
         
}
     

console.log(resArray);

return resArray;
},

}));



