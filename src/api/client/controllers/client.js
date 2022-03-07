'use strict';

/**
 *  client controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
module.exports = createCoreController('api::client.client', ({ env }) =>  ({

    async create(ctx) {
        console.log(" sadasdsadasdasd  ",ctx);
        const response = await super.create(ctx);
    
        const userObj = {firstName:"", lastName :"",email:"",login:"",password:"",authorities:[]};

        userObj.email= response.data.attributes.email;
        userObj.login= response.data.attributes.email;
        userObj.firstName = response.data.attributes.name;
        userObj.lastName = response.data.attributes.name;
        userObj.password = 'temp';
        userObj.authorities = ["ROLE_CLIENT"];
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


        const entry = await strapi.entityService.update('api::client.client', response.data.id  , {
            data: {
              uuid : updateObj.attributes.uuid,
            },
          });

        console.log("     updated response  response ",response);
        return response;
      }

}));
