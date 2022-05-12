'use strict';

/**
 *  employeebulkfile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::employeebulkfile.employeebulkfile', ({ env }) =>  ({
    
    async create(ctx) {
        const response = await super.create(ctx);  


        console.log(response);

     const fileResponse = await strapi.entityService.findOne('api::employeebulkfile.employeebulkfile', response.data.id, {
        
        populate:{
            excelfile:true
        }
        
      });

     let filePath = "/data/filles/file.xlsx";
      readxlsfile = ';ll'



      const entry = await strapi.entityService.create('api::employee.employee', {
        data: {
          name: 'My Article',
          email: 'My Article',
          mobile: 12423543453
        },
      });

      console.log("  fileResponse ",fileResponse);

      return response;
     
    }

    


}));
