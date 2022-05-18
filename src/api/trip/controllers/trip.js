'use strict';

/**
 *  trip controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const uuid = require('uuid');
var moment = require('moment');

module.exports = createCoreController('api::trip.trip', ({ env }) =>  ({
    
    async create(ctx) {

       console.log(" Creating trips  ",ctx);
       const map1 = new Map();
       const entry =   await strapi.entityService.findMany('api::route-bus.route-bus',{
            populate: ['route','bus']
        });

        let busIds = [];
        let routeBus = "";
    await    entry.forEach(element => {

            if(element.bus != undefined && element.bus.id != null 
                && element.route != undefined 
                && element.route.id != null)
            {
            map1.set(element.bus.id,element.route.id);
            }
          });


      await    map1.forEach(async(values,keys)=>{
           

            const busDriver =  await strapi.entityService.findMany('api::bus-driver.bus-driver',
            {
            filters: {
             bus:{
                 id:{
                   $eq: keys
                 }
             }
            },
            populate: ['bus','driver','helper']
          });

          const route =  await strapi.entityService.findMany('api::route.route',
            {
            filters: {
                 id:{
                   $eq: values
             }
            }
          });

          let trip = {
              tripdate : new Date(),
              uuid : uuid(),
              bus : busDriver.bus,
              driver : busDriver.driver,
              helper : busDriver.helper,
              route : route
         
    };

        const response =  await strapi.service('api::trip.trip').create(trip); 
       
        return response;


          });

     
    },

    async findCurrentTrips(ctx){
      const {clientId} = ctx.params;
      var todayDate = new Date().toISOString().slice(0, 10);

      if(clientId != null && clientId != undefined && clientId > 0){
        return await routeTripByClient(clientId,todayDate);
      }else{
        return await routeTripAdmin(todayDate);
      }
      
     

    },  
async findTripById(ctx){

  const { id } = ctx.params;
  console.log(" id ",id);
  const trip =    await strapi.entityService.findOne('api::trip.trip',id,{
    populate:{ route_bus: {
      populate :{route:true,bus:{
        populate :{driver:true,helper:true}
      }
     }
    } ,
    bus_driver :{
      populate:{driver:true,helper:true}
    }
  }

  });

return trip;
},

async updateStartTrip(ctx){

  const {id} = ctx.params;

  console.log(" id ",ctx.request.body.isstarted);


  const response = await  strapi.entityService.update('api::trip.trip',id,
  {
    data: {
    starttime: new Date(),
    isstarted: ctx.request.body.isstarted
  }
});
const employeedata =  await strapi.entityService.findMany('api::employeeotp.employeeotp',{
  filters:{
       
       trip:{
         id:{
         $eq : response.id
         }
       }
} ,populate:{employee:true}         

});
let player=[]
console.log(employeedata, 'employeedata')
if(employeedata){
 employeedata.map(item=>{
   if( item.employee.playerid!==null ){
    player.push(item.employee.playerid)
   }
  
  
 })
}
console.log(player)

console.log("  update response  ",response);


  return response;

},

async endTrip(ctx){
  const {id} = ctx.params;
  
  const response = await  strapi.entityService.update('api::trip.trip',id,
  {
    
    data: {
      endtime: new Date(),
      isended: ctx.request.body.isended

  }
});
  return response;

},

async createTrip(ctx){
  const {driveid} = ctx.params;

  
  const busDriver = await strapi.entityService.findMany('api::bus-driver.bus-driver',  {
    filters: { driver : 
      {
        id: driveid
      } 
    },

    populate : {driver:true,bus:true}
    
  });
  

const routeBus =  await strapi.entityService.findMany('api::route-bus.route-bus',
  {
  filters: {
   bus:{
    
        id: busDriver[0].bus.id
     
   }
  },
  populate: {route:true}
});


var tDate = new Date();
tDate.setHours(0,0,0,0);

const tripExist =  await strapi.entityService.findMany('api::trip.trip',
  {
  filters: {
   bus_driver:{
    
        id: busDriver[0].id
     
   },
   route_bus:{
     id: routeBus[0].id
   },
   tripdate:tDate
  },
  populate: {route:true}
});

if(tripExist != null && tripExist.length > 0 ){

  console.log(" trip not exist creating new  ");
var trip = {};

trip.data = {};
var timeArray = routeBus[0].time.split(":");

trip.data.tripdate = moment().format('YYYY-MM-DD');
trip.data.uuid = uuid.v4();
tDate.setHours(parseInt(timeArray[0]));
tDate.setMinutes(parseInt(timeArray[1]));
tDate.setSeconds(parseInt(timeArray[2]))
trip.data.scheduledtime = moment().format('YYYY-MM-DD hh:mm:ss');
trip.data.route_bus=routeBus[0];
trip.data.bus_driver=busDriver[0];
trip.data.isstarted=false;
trip.data.isended=false;

 const response =  await strapi.service('api::trip.trip').create(trip);

 console.log(" trip  ",trip);
 
 const routeEmployees = await strapi.entityService.findMany('api::employee.employee',
 {
 filters: {
  route:{
      id:{
        $eq: routeBus[0].route.id
      }
  }
 },
 populate: ['route']
});
console.log(routeEmployees, 'routeemployee')
 routeEmployees.forEach(element => {
  var employeeOTP = {};
  employeeOTP.data = {};
  employeeOTP.data.otp_date = tDate;
  employeeOTP.data.employee=  element;
  employeeOTP.data.isBoarded = false;
  employeeOTP.data.trip = response.data;
  employeeOTP.data.otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  employeeOTP.data.stop = element.stop;
  employeeOTP.data.isboardedwotp = false;
  strapi.service('api::employeeotp.employeeotp').create(trip);

});
console.log(trip, 'trip')




} else{

  console.log(" Trip exist no need to create ");

}

}

}));
function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

async function routeTripByClient(clientId,todayDate){
  const routeTrip = await strapi.entityService.findMany('api::trip.trip',{
    filters:{
         
         tripdate:{
           $gte : todayDate
         },
         isended:{
           $eq : false
         },
         isstarted :{
           $eq:true
         },
           route_bus:{
             route:{
               client:{
                 id:{
                 $eq:clientId
                 }
               }
             
               
             }
           
          }
}  ,

populate:{ route_bus: {
populate :{route:true,bus:{
populate :{driver:true,helper:true}
}
}
} ,
bus_driver :{
populate:{driver:true,helper:true}
}

}

});
console.log(routeTrip, 'routeTrip')
return routeTrip;
 } 


 async function routeTripAdmin(todayDate){

  console.log(todayDate);

  const routeTrip = await strapi.entityService.findMany('api::trip.trip',{
    filters:{
         
         tripdate:{
           $gte : todayDate
         },
         isended:{
           $eq : false
         },
         isstarted :{
           $eq:true
         }
}  ,

populate:{ route_bus: {
populate :{route:true,bus:{
populate :{driver:true,helper:true}
}
}
} ,
bus_driver :{
populate:{driver:true,helper:true}
}

}

});

return routeTrip;

    }