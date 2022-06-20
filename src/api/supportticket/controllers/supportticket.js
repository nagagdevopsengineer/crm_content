'use strict';

/**
 *  supportticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
//module.exports = createCoreController('api::supportticket.supportticket')

module.exports = createCoreController('api::supportticket.supportticket', ({ env }) =>  ({
    async create(ctx) {

        var response ;

        const API_URL = strapi.config.get('remote.freshdesktickets');
        const ticketObj = {description  :ctx.request.body.data.issue, 
            subject :ctx.request.body.data.subject,
            email:ctx.request.body.data.email,
            phone:request.body.data.mobile,
            priority:1,
            status:2
        }

        await  axios.post(API_URL , ticketObj,{
            auth: {
              username: strapi.config.get('remote.freshdeskusername'),
              password: strapi.config.get('remote.freshdeskpassword')
            }})
        .catch((error) => {
            console.log(" exception  ",error);
            return  Promise.reject(error);
        }).then(function(ticketData){
            response = ticketData.data;
            ctx.request.body.data.freshdeskid = ticketData.data.id;
            ctx.request.body.data.status = ticketData.data.status;
          
        });


        //const response = await super.create(ctx);
        return response;
    },

    async ticketdetails (ctx){

        const { id } = ctx.params;
        const API_URL = strapi.config.get('remote.freshdesktickets');
        
        var response;

        await  axios.get(API_URL+"/"+id+"?include=conversations" ,{
            auth: {
              username: strapi.config.get('remote.freshdeskusername'),
              password: strapi.config.get('remote.freshdeskpassword')
            }})
        .catch((error) => {
            console.log(" exception  ",error);
            return  Promise.reject(error);
        }).then(function(ticketData){
            response = ticketData.data;
            
        });
     return response;
    },

    async ticketdetails (ctx){

        const { id } = ctx.params;
        const API_URL = strapi.config.get('remote.freshdesktickets');
        
        var response;

        await  axios.get(API_URL+"/"+id+"?include=conversations" ,{
            auth: {
              username: strapi.config.get('remote.freshdeskusername'),
              password: strapi.config.get('remote.freshdeskpassword')
            }})
        .catch((error) => {
            console.log(" exception  ",error);
            return  Promise.reject(error);
        }).then(function(ticketData){
            response = ticketData.data;
            
        });
     return response;
    },


    async getTickets (ctx){

        const { email } = ctx.params;
        const API_URL = strapi.config.get('remote.freshdesktickets');
        
        var response;

        await  axios.get(API_URL+"?email="+email ,{
            auth: {
              username: strapi.config.get('remote.freshdeskusername'),
              password: strapi.config.get('remote.freshdeskpassword')
            }})
        .catch((error) => {
            console.log(" exception  ",error);
            return  Promise.reject(error);
        }).then(function(ticketData){
            response = ticketData.data;
            
        });
     return response;
    },

}))
