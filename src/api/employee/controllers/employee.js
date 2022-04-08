'use strict';

/**
 *  employee controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
module.exports = createCoreController('api::employee.employee', ({ env }) =>  ({
    
    async create(ctx) {
       
        const userObj = {firstName:"", lastName :"",email:"",login:"",password:"",mobile:0,authorities:[]};

        userObj.email= ctx.request.body.data.email;
        userObj.login= ctx.request.body.data.email;
        userObj.firstName = ctx.request.body.data.name;
        userObj.lastName = ctx.request.body.data.name;
        userObj.mobile = Number(ctx.request.body.data.contact);
        userObj.password = 'temp';
        userObj.authorities = ["ROLE_EMPLOYEE"];  

        const API_URL = strapi.config.get('remote.remotehost')+ ":"+strapi.config.get('remote.port')
        +strapi.config.get('remote.userapi');
        
      await  axios.post(API_URL , userObj)
        .catch((error) => {
            console.log(" exception  ",error);
            return  Promise.reject(error);
        }).then(function(dataUser){

            console.log("  response from user mgmt ==== >> ",dataUser);
           
            //updateObj.attributes.uuid=dataUser.data.userId;
            
            ctx.request.body.data.uuid = dataUser.data.userId;
          
        });

        const response = await super.create(ctx);
       
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
            orderBy: { id: 'asc' },
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
   
  } 
        

       });

       console.log("  upcomgin trip    ",upcomingTrips);

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
            $lte : todayDate
         },
         isstarted : true,
         isended : true
       } ,
       populate : {
         route_bus :  {
           populate : {route:true,bus:true}
          },
          bus_driver :{
            populate : {driver:true,helper:true}
          }
        }         

       });
       return routeTrip;

      },

      async employeesByStop(ctx){
        const { stopid ,tripid} = ctx.params;

        console.log(tripid," stop id  ",stopid);

        const employees = await strapi.entityService.findMany('api::employeeotp.employeeotp',{
            
          filters:{
           
              
                stop :{ 
                
                  id : stopid

             
                
              },
             
                trip: {
              
                id : tripid
              }
              
             
         
        },
        populate:{employee:true}
      

        });

        console.log(" employees  by stop ",employees);
        return employees;

      }






}));
