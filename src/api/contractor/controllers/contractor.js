'use strict';

/**
 *  contractor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
module.exports = createCoreController('api::contractor.contractor', ({ env }) =>  ({
    
    async create(ctx) {
       
       var response =  {};

        const userObj = {firstName:"", lastName :"",email:"",login:"",password:"",mobile:0,authorities:[]};

        userObj.email= ctx.request.body.data.email;
        userObj.login= ctx.request.body.data.email;
        userObj.firstName = ctx.request.body.data.name;
        userObj.lastName = ctx.request.body.data.lastname;
        userObj.mobile = ctx.request.body.data.contactnumber;
        userObj.password = 'temp';
        userObj.authorities = ["ROLE_CONTRACTOR"];  
        const API_URL = strapi.config.get('remote.remotehost')
        +strapi.config.get('remote.userapi');
       
      await  axios.post(API_URL , userObj)
        .catch((error) => {
            console.log(" exception  ",error.response.data.message );
            //throw new exception
            return  Promise.reject(error);
           
        }).then(function(dataUser){

            console.log("  response from user mgmt ==== >> ",dataUser);
            ctx.request.body.data.uuid = dataUser.data.userId;
            //updateObj = response.data;
            //updateObj.attributes.uuid=
        });

        
         response = await super.create(ctx);
    
        return response;
      }


      

}));
