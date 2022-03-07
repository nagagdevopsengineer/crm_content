'use strict';

/**
 *  client controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
module.exports = createCoreController('api::client.client', ({ env }) =>  ({

    async create(ctx) {
        // some logic here
        const response = await super.create(ctx);
        

        console.log(" =-=== response   ",response)

        const userObj = {firstName:"", lastName :"",email:"",login:"",password:"",authorities:[]};

        userObj.email= response.data.attributes.email;
        userObj.login= response.data.attributes.email;
        userObj.firstName = response.data.attributes.name;
        userObj.lastName = response.data.attributes.name;
        userObj.password = 'temp';
        userObj.authorities = ["ROLE_CLIENT"];
        const API_URL = strapi.config.get('remote.remotehost')+ ":"+strapi.config.get('remote.port')
        +strapi.config.get('remote.userapi');

        console.log(" url  ",userObj)

      await  axios.post(API_URL , userObj)
        .catch((error) => {
            console.log(" exception  ",error);
        }).then(function(dataUser){

            console.log("  response from user mgmt ==== >> ",dataUser);
        });
      
       
        return response;
      }

}));
