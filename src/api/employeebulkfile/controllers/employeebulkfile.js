'use strict';

/**
 *  employeebulkfile controller
 */
const reader = require("xlsx")
const employees = require('../../employee/content-types/employee/schema.json')
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

     let filePath = "/Users/shivakanya/MyData/employee-6.xlsx";
     console.log(filePath, 'file')
     const exceldata=[]
      if(filePath){
        const file = reader.readFile(filePath)
        const sheets = file.SheetNames
        for(let i=0;i<sheets.length;i++){
          const temp= reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
          temp.forEach(res=>{
            exceldata.push(res)
          })
        }
        console.log(exceldata, 'exceldata')
      }
      let finalInsertArray = [];
      for (let i = 0; i < exceldata.length; i++) {
        const entry = await strapi.entityService.create('api::employee.employee', {
          data: {
            employeename: exceldata[i].Full_Name,
            email: exceldata[i].Email_ID,
            contact: exceldata[i].Contact_Number
            
          },

        });

        console.log(entry,'entry')
        // module.exports = createCoreController('api::employebulkuploadlog.employebulkuploadlog', ({ strapi }) =>  ({
        //   // Method 1: Creating an entirely custom action
        //   async exampleAction(ctx) {
        //     try {

        //       const data = {employeename:"", email:"", mobile:""};

        //       ctx.body = 'ok';
        //     } catch (err) {
        //       ctx.body = err;
        //     }
        //   }
        // }));
        const logentry =  await strapi.entityService.create('api::employebulkuploadlog.employebulkuploadlog', {
          data:{
            employeesname:exceldata[i].Full_Name,
            email:exceldata[i].email,
            mobile:exceldata[i].Contact_Number,
            // statustext:exceldata[i].statustext,
            //id,
            //error

          }
        });
        // console.log(data, 'dd')
       
        console.log(logentry, 'logentry')
        // return response;
      }
    
      return response;
     
    }

}));
