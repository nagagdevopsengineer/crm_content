'use strict';

/**
 *  client controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const axios = require('axios');
module.exports = createCoreController('api::client.client', ({ env }) =>  ({

    async create(ctx) {

        const userObj = {firstName:"", lastName :"",email:"",login:"",password:"",mobile:0,authorities:[]};

        userObj.email= ctx.request.body.data.email;
        userObj.login= ctx.request.body.data.email;
        userObj.firstName = ctx.request.body.data.name;
        userObj.lastName = ctx.request.body.data.lastname;
        userObj.mobile = ctx.request.body.data.mobile;
        userObj.password = 'temp';
        userObj.authorities = ["ROLE_CLIENT"];
        const API_URL = strapi.config.get('remote.remotehost')+strapi.config.get('remote.userapi');


      await  axios.post(API_URL ,userObj)
        .then(function(dataUser){
            console.log("  response from user mgmt ==== >> ",dataUser);
            ctx.request.body.data.uuid = dataUser.data.userId;
            //updateObj.attributes.uuid=dataUser.data.userId;
        }).catch((error) => {
          console.log(" exception  ",error.message);
          return  Promise.reject(error);
      });

        const response = await super.create(ctx);
        return response;

      }

}));
