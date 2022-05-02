'use strict';

/**
 *  routechange controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
;//module.exports = createCoreController('api::employee.employee', ({ env }) =>  ({
module.exports = createCoreController('api::routechange.routechange',() => ({


    async update(ctx) {
        const {id} = ctx.params;
        console.log("  update request change   ",ctx.request.body.data);
        const entry = await strapi.entityService.update('api::routechange.routechange', id, {
            data: {
              status: ctx.request.body.data.status,
            },
          });

          var employ = {};

          if(entry.status == 'approved'){

            const employee = await strapi.entityService.update('api::employee.employee', ctx.request.body.data.employee, {
                data: {
                  bus: ctx.request.body.data.bus,
                  stop: ctx.request.body.data.stop,
                  route:ctx.request.body.data.route
                },
              });

              employ = employee;

          }

          return entry;

    },

})

);
