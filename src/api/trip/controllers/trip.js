"use strict";

/**
 *  trip controller
 */
const dotenv = require("dotenv").config();
const { createCoreController } = require("@strapi/strapi").factories;
const uuid = require("uuid");
var moment = require("moment");
const axios = require("axios");
const { latitude, longitude } = require("./value");
const OneSignal = require("react-onesignal");
// import axios from 'axios'

module.exports = createCoreController("api::trip.trip", ({ env }) => ({
  async create(ctx) {
    console.log(" Creating trips  ", ctx);
    const map1 = new Map();
    const entry = await strapi.entityService.findMany(
      "api::route-bus.route-bus",
      {
        populate: ["route", "bus"],
      }
    );

    let busIds = [];
    let routeBus = "";
    await entry.forEach((element) => {
      if (
        element.bus != undefined &&
        element.bus.id != null &&
        element.route != undefined &&
        element.route.id != null
      ) {
        map1.set(element.bus.id, element.route.id);
      }
    });

    await map1.forEach(async (values, keys) => {
      const busDriver = await strapi.entityService.findMany(
        "api::bus-driver.bus-driver",
        {
          filters: {
            bus: {
              id: {
                $eq: keys,
              },
            },
          },
          populate: ["bus", "driver", "helper"],
        }
      );

      const route = await strapi.entityService.findMany("api::route.route", {
        filters: {
          id: {
            $eq: values,
          },
        },
      });

      let trip = {
        tripdate: new Date(),
        uuid: uuid(),
        bus: busDriver.bus,
        driver: busDriver.driver,
        helper: busDriver.helper,
        route: route,
      };

      const response = await strapi.service("api::trip.trip").create(trip);

      return response;
    });
  },

  async findCurrentTrips(ctx) {
    const { clientId } = ctx.params;
    var todayDate = new Date().toISOString().slice(0, 10);

    if (clientId != null && clientId != undefined && clientId > 0) {
      return await routeTripByClient(clientId, todayDate);
    } else {
      return await routeTripAdmin(todayDate);
    }
  },
  async findTripById(ctx) {
    const { id } = ctx.params;

    const trip = await strapi.entityService.findOne("api::trip.trip", id, {
      populate: {
        route_bus: {
          populate: {
            route: true,
            bus: {
              populate: { driver: true, helper: true },
            },
          },
        },
        bus_driver: {
          populate: { driver: true, helper: true },
        },
      },
    });

    return trip;
  },

  async updateStartTrip(ctx) {
    const { id } = ctx.params;

    const response = await strapi.entityService.update("api::trip.trip", id, {
      data: {
        starttime: new Date(),
        isstarted: ctx.request.body.isstarted,
      },
      populate: {
        route_bus: { populate: { route: { populate: { stops: true } } } },
      },
    });

    const stops = await strapi.entityService.findMany("api::stop.stop", {
      filters: {
        route: {
          id: response.route_bus.route.id,
        },
      },
      orderBy: { order: "asc" },
    });

    const employeedata = await strapi.entityService.findMany(
      "api::employeeotp.employeeotp",
      {
        filters: {
          trip: {
            id: {
              $eq: response.id,
            },
          },
        },
        populate: { employee: true },
      }
    );
    let player = [];

    if (employeedata) {
      employeedata.map((item) => {
        player.push({
          playerid: item.employee.playerid,
          // 'employeeid':item.employee.id,
          name: item.employee.name,
          employeeId: item.employee.id,
          notificationtype: "Start trip notification",
          contenttype: "Your trip  has started",
          newDate: new Date().toISOString().slice(0, 10),
        });
      });

      const message = axios
        .post(`${process.env.BASE_URL}/bulknotifications`, player, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        .then((res) => {
          console.log("here");
        })
        .catch((err) => {
          console.log("error");
        });
    }

    const vechiclelocation = await axios.get(
      `http://dev-tracking.vapprtech.com/vehiclelocations?filter[where][tripId]=${id}&filter[order]=timestamp%20DESC`
    );

    let calTimeDiffAchived = (currentTime) => {
      let firstTimestamp =
        vechiclelocation.data[vechiclelocation.data.length - 1].timestamp;

      let diff = new Date(firstTimestamp) - new Date(currentTime);

      let diffmin = Math.abs(Math.ceil(diff / 1000 / 60 / 60));

      if (diffmin >= 10) {
        return true;
      } else {
        return false;
      }
    };

    for (let i = vechiclelocation.data.length - 1; i >= 0; i--) {
      if (parseInt(vechiclelocation.data[i].speed) === 0) {
        if (calTimeDiffAchived(vechiclelocation.data[i].timestamp)) {
          console.log("Push Notification");
          break;
          // await OneSignal.init({ appId: 'f1de68f0-1267-442a-ba63-41659f65541e', allowLocalhostAsSecureOrigin: true});
          //   OneSignal.showSlidedownPrompt();
        }
      } else {
        break;
      }
    }

    return response;
  },

  async busTracking(ctx) {
    const { tripId, lat, long } = ctx.params;
    console.log("bus tracking", tripId,lat, long)

    const trip = await strapi.entityService.findOne("api::trip.trip", tripId, {
      populate: {
        route_bus: {
          populate: {
            route: { populate: { stops: true } },
          },
        },
      },
    });

    const stops = await strapi.entityService.findMany("api::stop.stop", {
      filters: {
        route: {
          id: trip.route_bus.route.id,
        },
      },
      orderBy: { order: "asc" },
    });

    for (let i = 0; i < stops.length; i++) {
      let stopLat = stops[i].latitude;
      let stopLong = stops[i].longitude;
      let vehicleLat = lat;
      let vehicleLong = long;
      let api_key = "AIzaSyDD8zp_hulyclcTqNRaB_LS4cE5z9cXJ6o";

      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${stopLat}+${stopLong}&origins=${vehicleLat}+${vehicleLong}&key=${api_key}`
      );
      // console.log(result.data,'result')

      let distance = result.data.rows[0].elements[0].distance.text;

      if (parseFloat(distance, 10) <= 1500) {
        const employeedata = await axios.get(
          `http://dev-crmcontent.vapprtech.com/api/employees/es/${stops[i].id}/${tripId}`
        );

        let details = [];
        employeedata.data.map((item) => {
          details.push({
            playerid: item.employee.playerid,
            // 'employeeid':item.employee.id,
            name: item.employee.name,
            employeeId: item.employee.id,
            notificationtype: "Notification",
            contenttype: "Your bus about to reach",
          });
        });

        const message = axios
          .post(`${process.env.BASE_URL}/bulknotifications`, details, {
            headers: {
              "Content-Type": "application/json",
            },
          })

          .then((res) => {
            console.log("Notification sent");
          })
          .catch((err) => {
            console.log("error", err);
          });
      } else {
        console.log("in else");
      }
    }

    return "SUCCESS";
  },
  async employeeTracking(ctx) {
    const { tripId, lat, long } = ctx.params;

    const trip = await strapi.entityService.findOne("api::trip.trip", tripId, {
      populate: {
        route_bus: {
          populate: {
            route: true,
          },
        },
      },
    });

    const stops = await strapi.entityService.findMany("api::stop.stop", {
      filters: {
        route: {
          id: trip.route_bus.route.id,
        },
      },
      orderBy: { order: "asc" },
    });

    for (let i = 0; i < stops.length; i++) {
      let stopLat = stops[i].latitude;
      let stopLong = stops[i].longitude;
      let employeeLat = 28.409142326590054;
      let employeeLong = 77.10422982468931;
      let api_key = "AIzaSyDD8zp_hulyclcTqNRaB_LS4cE5z9cXJ6o";

      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${stopLat}+${stopLong}&origins=${employeeLat}+${employeeLong}&key=${api_key}`
      );

      let distance = result.data.rows[0].elements[0].distance.text;

      if (parseFloat(distance, 10) <= 1500) {
        const employeedata = await axios.get(
          `http://dev-crmcontent.vapprtech.com/api/employees/es/${stops[i].id}/${tripId}`
        );

        let details = [];
        employeedata.data.map((item) => {
          details.push({
            playerid: item.employee.playerid,

            name: item.employee.name,
            employeeId: item.employee.id,
            notificationtype: "Notification",
            contenttype: "Employee tracking",
          });
        });

        const message = axios
          .post(`${process.env.BASE_URL}/bulknotifications`, details, {
            headers: {
              "Content-Type": "application/json",
            },
          })

          .then((res) => {
            console.log("Notification sent");
          })
          .catch((err) => {
            console.log("Something went wrong");
          });
      } else {
        console.log("in else");
      }
    }

    return "SUCCESS";
  },

  async endTrip(ctx) {
    const { id } = ctx.params;

    const response = await strapi.entityService.update("api::trip.trip", id, {
      data: {
        endtime: new Date(),
        isended: ctx.request.body.isended,
      },
    });
    return response;
  },

  async createTrip(ctx) {
    const { driveid } = ctx.params;

    const busDriver = await strapi.entityService.findMany(
      "api::bus-driver.bus-driver",
      {
        filters: {
          driver: {
            id: driveid,
          },
        },

        populate: { driver: true, bus: true },
      }
    );

    const routeBus = await strapi.entityService.findMany(
      "api::route-bus.route-bus",
      {
        filters: {
          bus: {
            id: busDriver[0].bus.id,
          },
        },
        populate: { route: true },
      }
    );

    var tDate = new Date();
    tDate.setHours(0, 0, 0, 0);

    const tripExist = await strapi.entityService.findMany("api::trip.trip", {
      filters: {
        bus_driver: {
          id: busDriver[0].id,
        },
        route_bus: {
          id: routeBus[0].id,
        },
        tripdate: tDate,
      },
      populate: { route: true },
    });

    if (tripExist != null && tripExist.length > 0) {
      console.log(" trip not exist creating new  ");
      var trip = {};

      trip.data = {};
      var timeArray = routeBus[0].time.split(":");

      trip.data.tripdate = moment().format("YYYY-MM-DD");
      trip.data.uuid = uuid.v4();
      tDate.setHours(parseInt(timeArray[0]));
      tDate.setMinutes(parseInt(timeArray[1]));
      tDate.setSeconds(parseInt(timeArray[2]));
      trip.data.scheduledtime = moment().format("YYYY-MM-DD hh:mm:ss");
      trip.data.route_bus = routeBus[0];
      trip.data.bus_driver = busDriver[0];
      trip.data.isstarted = false;
      trip.data.isended = false;

      const response = await strapi.service("api::trip.trip").create(trip);

      const routeEmployees = await strapi.entityService.findMany(
        "api::employee.employee",
        {
          filters: {
            route: {
              id: {
                $eq: routeBus[0].route.id,
              },
            },
          },
          populate: ["route"],
        }
      );

      routeEmployees.forEach((element) => {
        var employeeOTP = {};
        employeeOTP.data = {};
        employeeOTP.data.otp_date = tDate;
        employeeOTP.data.employee = element;
        employeeOTP.data.isBoarded = false;
        employeeOTP.data.trip = response.data;
        employeeOTP.data.otp = (Math.floor(Math.random() * 10000) + 10000)
          .toString()
          .substring(1);
        employeeOTP.data.stop = element.stop;
        employeeOTP.data.isboardedwotp = false;
        strapi.service("api::employeeotp.employeeotp").create(trip);
      });
    } else {
      console.log(" Trip exist no need to create ");
    }
  },
}));
function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

async function routeTripByClient(clientId, todayDate) {
  const routeTrip = await strapi.entityService.findMany("api::trip.trip", {
    filters: {
      tripdate: {
        $gte: todayDate,
      },
      isended: {
        $eq: false,
      },
      isstarted: {
        $eq: true,
      },
      route_bus: {
        route: {
          client: {
            id: {
              $eq: clientId,
            },
          },
        },
      },
    },

    populate: {
      route_bus: {
        populate: {
          route: true,
          bus: {
            populate: { driver: true, helper: true },
          },
        },
      },
      bus_driver: {
        populate: { driver: true, helper: true },
      },
    },
  });

  return routeTrip;
}

async function routeTripAdmin(todayDate) {
  const routeTrip = await strapi.entityService.findMany("api::trip.trip", {
    filters: {
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

    populate: {
      route_bus: {
        populate: {
          route: true,
          bus: {
            populate: { driver: true, helper: true },
          },
        },
      },
      bus_driver: {
        populate: { driver: true, helper: true },
      },
    },
  });

  return routeTrip;
}
