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
        var dataRes = {};
        const entry = await strapi.entityService.findMany('api::employee.employee',  {
          filters: { uuid : uuid },
          populate:{
            route:true,
            bus: true,
            stop:true
          }
          
        });

        dataRes.employee = entry[0]; 

        const busDriver = await strapi.entityService.findMany('api::bus-driver.bus-driver',  {
          filters: { bus : 
            {
              id: entry[0].bus.id
            } 
          },

          populate : {driver:true,helper:true}
          
        });
        

        dataRes.bus = busDriver[0];

        var todayDate = new Date().toISOString().slice(0, 10);
           console.log(todayDate);
          const routeTrip = await strapi.entityService.findMany('api::trip.trip',{
               filters:{
                    /**  'route-bus' :{
                      id:routeBuses[0].id
                    },*/
                    tripdate:{
                      $gte : todayDate
                    },
                    isended:{
                      $eq : false
                    },
                    isstarted :{
                      $eq:true
                    }
      
          }          

          });
         
          if(routeTrip != null && routeTrip.length > 0 ){ 
            dataRes.trip = routeTrip[0];
          const employeeTripOTP =  await strapi.entityService.findMany('api::employeeotp.employeeotp',{
            filters:{
                 /**  'route-bus' :{
                   id:routeBuses[0].id
                 },*/
                 trip:{
                   id:{
                   $eq : routeTrip[0].id
                   }
                 }
       }          

       });

       dataRes.tripOTP = employeeTripOTP[0];
      }


          const upcomingTrips = await strapi.entityService.findMany('api::trip.trip',{
            filters:{
                 /**  'route-bus' :{
                   id:routeBuses[0].id
                 },*/
                 tripdate:{
                   $gte : todayDate
                 },
                 isended:{
                   $eq : false
                 },
                 isstarted :{
                   $eq:false
                 }
   
  } ,
  orderBy: { id: 'asc' }         

       });
       dataRes.upcomingTrip = upcomingTrips[0];
        return dataRes;
      },

      async findPreviousTrips(ctx){
        const { uuid } = ctx.params;
        var todayDate = new Date().toISOString().slice(0, 10);
        console.log(todayDate);
       const routeTrip = await strapi.entityService.findMany('api::trip.trip',{
            filters:{
                 /**  'route-bus' :{
                   id:routeBuses[0].id
                 },*/
            tripdate:{
            $lt : todayDate
         }
       }          

       });
       return routeTrip;

      },

      async employeesByStop(ctx){
        const { stopid } = ctx.params;

        console.log(" stop id  ",stopid);

        const employees = await strapi.entityService.findMany('api::employee.employee',{
            
          filters:{
            stop:{
             id : stopid
          }
        }
      

        });

        console.log(" employees  ",employees);


        return employees;

      }






}));
