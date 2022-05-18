'use strict';

/**
 *  employeeotp controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::employeeotp.employeeotp', ({ env }) =>  ({


    async update(ctx){
    
    const response =  await super.update(ctx);   
    
    if(response.isBoarded){

        //get employee details and invoke notification API here.

    }

    return response;
    },

}))
