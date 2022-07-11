"use strict";

/**
 *  employee controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const axios = require("axios");
module.exports = createCoreController("api::employee.employee", ({ env }) => ({
  async create(ctx) {
    const userObj = {
      firstName: "",
      lastName: "",
      email: "",
      login: "",
      password: "",
      mobile: 0,
      authorities: [],
    };

    userObj.email = ctx.request.body.data.email;
    userObj.login = ctx.request.body.data.email;
    userObj.firstName = ctx.request.body.data.name;
    userObj.lastName = ctx.request.body.data.lastname;
    userObj.mobile = Number(ctx.request.body.data.contact);
    userObj.password = "temp";
    userObj.authorities = ["ROLE_EMPLOYEE"];

    const API_URL =
      strapi.config.get("remote.remotehost") +
      strapi.config.get("remote.userapi");

    await axios
      .post(API_URL, userObj)
      .catch((error) => {
        console.log(" exception  ", error);
        return Promise.reject(error);
      })
      .then(function (dataUser) {
        console.log("  response from user mgmt ==== >> ", dataUser);

        //updateObj.attributes.uuid=dataUser.data.userId;

        ctx.request.body.data.uuid = dataUser.data.userId;
      });

    const response = await super.create(ctx);

    return response;
  },

  async findEmployeeDetils(ctx) {
    const { uuid } = ctx.params;
    var dataRes = {};
    const entry = await strapi.entityService.findMany(
      "api::employee.employee",
      {
        filters: { uuid: uuid },
        populate: {
          route: true,
          bus: true,
          stop: true,
        },
      }
    );

    const emergencyContacts = await strapi.entityService.findMany(
      "api::employee-emergency-contact.employee-emergency-contact",
      {
        filters: {
          employee: {
            id: entry[0].id,
          },
        },
      }
    );

    dataRes.employee = entry[0];
    dataRes.emergencyContacts = emergencyContacts;

    const busDriver = await strapi.entityService.findMany(
      "api::bus-driver.bus-driver",
      {
        filters: {
          bus: {
            id: entry[0].bus.id,
          },
        },

        populate: { driver: { populate: "*" }, helper: { populate: "*" } },
      }
    );

    dataRes.bus = busDriver[0];

    var todayDate = new Date().toISOString().slice(0, 10);
    console.log(busDriver[0].id);
    const routeTrip = await strapi.entityService.findMany("api::trip.trip", {
      filters: {
        bus_driver: {
          id: busDriver[0].id,
        },
        tripdate: {
          $gte: todayDate,
        },
        isended: {
          $eq: false,
        },
        isstarted: {
          $eq: true,
        },
      },
    });
    console.log(routeTrip, "routeTrip");

    const employeeTripFeedback = await strapi.entityService.findMany(
      "api::employeeotp.employeeotp",
      {
        filters: {
          employee: {
            id: dataRes.employee.id,
          },
          trip: {
            isstarted: {
              $eq: true,
            },
            isended: {
              $eq: true,
            },
          },
        },
        sort: { id: "DESC" },
        limit: 1,
      }
    );

    dataRes.tripFeedBack = employeeTripFeedback;

    if (routeTrip != null && routeTrip.length > 0) {
      dataRes.trip = routeTrip[0];
      const employeeTripOTP = await strapi.entityService.findMany(
        "api::employeeotp.employeeotp",
        {
          filters: {
            employee: {
              id: dataRes.employee.id,
            },
            trip: {
              id: {
                $eq: routeTrip[0].id,
              },
            },
          },
        }
      );
      console.log(employeeTripOTP, "employeeTripOTP");
      dataRes.tripOTP = employeeTripOTP[0];

      const routeStops = await strapi.entityService.findMany("api::stop.stop", {
        filters: {
          route: {
            id: entry[0].route.id,
          },
        },

        sort: { order: "asc" },
      });

      dataRes.routeStops = routeStops;
    }

    const upcomingTrips = await strapi.entityService.findMany(
      "api::trip.trip",
      {
        sort: { id: "asc" },
        filters: {
          bus_driver: {
            id: busDriver[0].id,
          },
          tripdate: {
            $gte: todayDate,
          },
          isended: {
            $eq: false,
          },
          isstarted: {
            $eq: false,
          },
        },
      }
    );

    console.log("  upcomgin trip    ", upcomingTrips);

    dataRes.upcomingTrip = upcomingTrips[0];

    return dataRes;
  },

  async findPreviousTrips(ctx) {
    const { uuid } = ctx.params;
    var todayDate = new Date().toISOString().slice(0, 10);
    console.log(todayDate);

    const employeeTrips = await strapi.entityService.findMany(
      "api::employeeotp.employeeotp",
      {
        filters: {
          employee: {
            id: uuid,
          },
          trip: {
            tripdate: {
              $lte: todayDate,
            },
            isstarted: true,
            isended: true,
          },
        },
        populate: {
          trip: {
            populate: {
              route_bus: {
                populate: { route: true, bus: true },
              },
              bus_driver: {
                populate: { driver: true, helper: true },
              },
            },
          },
        },
        sort: { id: "desc" },
      }
    );

    /***    const routeTrip = await strapi.entityService.findMany('api::trip.trip',{
            filters:{
                 /**  'route-bus' :{
                   id:routeBuses[0].id
                 },
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

       }); **/
    return employeeTrips;
  },

  async employeesByStop(ctx) {
    const { stopid, tripid } = ctx.params;
    const employees = await strapi.entityService.findMany(
      "api::employeeotp.employeeotp",
      {
        filters: {
          stop: {
            id: stopid,
          },
          trip: {
            id: tripid,
          },
        },
        populate: { employee: { populate: "*" } },
      }
    );

    console.log(" employees  by stop ", employees);
    return employees;
  },

  async bulkupload(ctx) {
    const { employee } = ctx;
    console.log("  employee ", employee);
  },

  async employeesCount(ctx) {
    const { clientid } = ctx.params;
    const [entries, count] = await strapi.db
      .query("api::employee.employee")
      .findWithCount({
        select: [],
        where: { client: { id: clientid } },
      });
    console.log("count == ", count);
    return count;
  },

  async employeesAllCount(ctx) {
    const [entries, count] = await strapi.db
      .query("api::employee.employee")
      .findWithCount({
        select: [],
      });
    console.log("count == ", count);
    return count;
  },

  async employeesStop(ctx) {
    // const { stopid, tripid } = ctx.params;
    const employees = await strapi.entityService.findMany(
      "api::employeeotp.employeeotp",
      {
        filters: {
        
        },
        populate: { stop: { populate: "*" } },
      }
    );
    let test =[]
    const data = employees.map(item =>{
     if(item.stop!= null ) {

      test.push(item.stop.name)
     }
    })
   let occurrences = test.reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});
    console.log(occurrences, 'ooo')
    
    const pickHighest = (obj, num =1 ) => {
      console.log("hereehbc")
      const requiredObj = {};
      if(num > Object.keys(obj).length){
         return false;
      };
      Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, ind) =>
      {
         if(ind < num){
            requiredObj[key] = obj[key];
         }
      });
     
      console.log(requiredObj, 'hhh')
      return requiredObj;
   };
   pickHighest(occurrences, 5)
  
    // console.log(pickHighest, 'HHII')
    // console.log(requiredObj, 'hhh')
    // console.log(" employees  by stop ", employees);
    return employees;
  },

}));
