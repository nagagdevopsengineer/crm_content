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

    let filePath = "/Users/shivakanya/MyData/newEmplydata.xlsx";
    // let filePath =  "/Users/rajeevtyagi/Downloads/employeeUploadTemplate.xlsx";
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
        let statusText = "SUCCESS";
        let status = true;
        let errorObj = "";
        
        try{
        const entry = await strapi.entityService.create('api::employee.employee', {
          data: {
            name: exceldata[i].Full_Name,
            email: exceldata[i].Email_ID,
            contact: exceldata[i].Contact_Number
            
          },

        });
        console.log(entry,'entry')
      }catch(error){
       
        statusText = "ERROR";
        status = false;
        let errObj = error.details;

        console.log("error 2 ==>>>> ",errObj);

        for (let i = 0; i < errObj.errors.length; i++ ){
          errorObj = errorObj+i+"."+errObj.errors[i].path[0] +" - "+errObj.errors[i].message;
        }
      }

      
        //console.log(entry,'entry')
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

        try{
        const logentry =  await strapi.entityService.create('api::employebulkuploadlog.employebulkuploadlog', {
          data:{
            employeename:exceldata[i].Full_Name,
            email:exceldata[i].Email_ID,
            mobile:exceldata[i].Contact_Number,
            statustext:statusText,
            error:errorObj,
            status:status,
            employeebulkfile:fileResponse.id

          }
        });
        
      }catch(errorl){
        
      }
      }
    
      return response;
     
    }

}));
