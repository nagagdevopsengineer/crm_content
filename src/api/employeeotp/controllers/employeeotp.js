'use strict';

const employee = require('../../employee/controllers/employee');

/**
 *  employeeotp controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::employeeotp.employeeotp', ({ env }) =>  ({


    async update(ctx){
        const {id} = ctx.params;
    console.log(ctx, 'xtx')
    console.log(id)
    const response =  await super.update(ctx);   
    console.log(response, 'responsedata')

    const employeeboadingdata =  await strapi.entityService.findMany('api::employeeotp.employeeotp',{
        filters:{
             
           
               id:{
               $eq : id
               }
             
      } ,populate:{employee:true}         
      
      });
    console.log( employeeboadingdata, 'testing in otp')
    let employeeboarded=[]

if(employeeboadingdata){
    
    employeeboadingdata.map(item=>{
   
        employeeboarded.push({
        'playerid':item.employee.playerid,
    'id':item.employee.id,
    'name':item.employee.name,
    'uuid':item.employee.uuid,
    'employeeid':item.employee.employeeid
    })
   
  
  
 })
}
console.log(employeeboarded, 'player id')

    // if(response.isBoarded){

    //     //get employee details and invoke notification API here.

    // }

    return response;
    },

}))
