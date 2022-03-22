'use strict';

/**
 *  employee controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
module.exports = createCoreController('api::employee.employee', ({ env }) =>  ({
    
    async create(ctx) {
       
        const response = await super.create(ctx);
    
        const userObj = {firstName:"", lastName :"",email:"",login:"",password:"",mobile:0,authorities:[]};

        userObj.email= response.data.attributes.email;
        userObj.login= response.data.attributes.email;
        userObj.firstName = response.data.attributes.name;
        userObj.lastName = response.data.attributes.name;
        userObj.mobile = Number(response.data.attributes.contact);
        userObj.password = 'temp';
        userObj.authorities = ["ROLE_EMPLOYEE"];  

        console.log("USer Obj",userObj);

        const API_URL = strapi.config.get('remote.remotehost')+ ":"+strapi.config.get('remote.port')
        +strapi.config.get('remote.userapi');
        var updateObj = response.data;
      await  axios.post(API_URL , userObj)
        .catch((error) => {
            console.log(" exception  ",error);
        }).then(function(dataUser){

            console.log("  response from user mgmt ==== >> ",dataUser);
           
            updateObj.attributes.uuid=dataUser.data.userId;
            

          
        });


        const entry = await strapi.entityService.update('api::employee.employee', response.data.id  , {
            data: {
              uuid : updateObj.attributes.uuid,
            },
          });

        console.log("     updated response  response ",response);
        return response;
      },


      async findEmployeeDetils(ctx){

        const { uuid } = ctx.params;

        const entry = await strapi.entityService.findMany('api::employee.employee',  {
          filters: { uuid : uuid },
          populate:{
            route:true,
            bus: true,
            stop:true
          }
          
        });

        

        const busDriver = await strapi.entityService.findMany('api::bus-driver.bus-driver',  {
          filters: { bus : 
            {
              id: entry[0].bus.id
            } 
          },

          populate : {driver:true,helper:true}
          
        });
        console.log("  sadfdsfdsfdsfds f dsf ds f ds fds fsd f sdf  busDriver ",busDriver);

        var dataRes = {};

        dataRes.employee = entry[0];
        dataRes.bus = busDriver[0]

        return dataRes;
      }

}));
