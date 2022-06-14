'use strict';

/**
 *  supportticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
//module.exports = createCoreController('api::supportticket.supportticket')

module.exports = createCoreController('api::supportticket.supportticket', ({ env }) =>  ({
    async create(ctx) {

        const API_URL = "https://vapprtech.freshdesk.com/api/v2/tickets";

        const ticketObj = {description  :ctx.request.body.data.issue, 
            subject :ctx.request.body.data.subject,
            email:ctx.request.body.data.email,
            priority:1,
            status:2
        }

        await  axios.post(API_URL , ticketObj,{
            auth: {
              username: 'a57SSfoUyZ5WdiQJE75',
              password: 'a57SSfoUyZ5WdiQJE75'
            }})
        .catch((error) => {
            console.log(" exception  ",error);
            return  Promise.reject(error);
        }).then(function(ticketData){
            ctx.request.body.data.freshdeskid = ticketData.data.id;
            ctx.request.body.data.status = ticketData.data.status;
          
        });


        const response = await super.create(ctx);
        return response;
    },

}))
