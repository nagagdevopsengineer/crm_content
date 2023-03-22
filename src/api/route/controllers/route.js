"use strict";

/**
 *  route controller
 */
const { default: axios } = require("axios");
const { createCoreController } = require("@strapi/strapi").factories;
const moment = require("moment");

module.exports = createCoreController("api::route.route", ({ env }) => ({
  async create(ctx) {
    try {
      let postdata = ctx.request.body;
      let data = postdata.data.stops;

      let sum = 0;
      const calDistance = async (src, dest) => {
        try {
          console.log(src, dest, "gg");
          const value = await axios.get(
           // `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${src.lat}+${src.lng}&origins=${dest.lat}+${dest.lng}&key=AIzaSyA7jKr8cUZnMXeuccPPztmG1Ucp-RfBxVY`

           `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${src.lat}+${src.lng}&origins=${dest.lat}+${dest.lng}&key=AIzaSyBnr9FiEbgZho6HokE2akAMG08v0KCHEUU`
          );

          const distance = parseFloat(
            value.data.rows[0].elements[0].distance.text
          );

          return distance;
        } catch (err) {
          console.log("err", err);
        }
      };
      for (let i = 0; i < data.length - 1; i++) {
        const result = await calDistance(data[i], data[i + 1]);

        sum += result;
      }

      ctx.request.body.data.Km = sum.toFixed(2);

      const response = await super.create(ctx);

      return response;
    } catch (err) {
      console.log(err);
    }

    return null;
  },

  async findAvailableRoutes(ctx) {
    const { clientid } = ctx.params;

    const mappedRoutesAndBuses = await strapi.entityService.findMany(
      "api::route-bus.route-bus",
      {
        filters: {
          route: {
            client: {
              id: clientid,
            },
          },
        },
        populate: { route: true },
      }
    );

    let routes = [];

    await mappedRoutesAndBuses.forEach((element) => {
      routes.push(element.route.id);
    });

    const avaialbeRoutes = await strapi.entityService.findMany(
      "api::route.route",
      {
        filters: {
          client: {
            id: clientid,
          },

          id: {
            $notIn: routes,
          },
        },
      }
    );

    return avaialbeRoutes;
  },
  async find(ctx) {
    // some custom logic here
    //ctx.query = { ...ctx.query, local: 'en' }

    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    var routIds = [];
    var data2 = data;

    for (let i = 0; i < data2.length; i++) {
      console.log(data2[i].id);

      const stops = await strapi.entityService.findMany("api::stop.stop", {
        filters: {
          route: {
            id: data2[i].id,
          },
        },
        sort: { order: "asc" },
      });

      //element.attributes.route.data.stops = stops;
      data[i].stops = stops;
    }

    return { data, meta };
  },

  async allRoute(ctx) {
    const [entries, count] = await strapi.db
      .query("api::route.route")
      .findWithCount({
        select: [],
      });
    console.log("count == ", count);
    return count;
  },
  async clientRoute(ctx) {
    const { clientid } = ctx.params;
    const [entries, count] = await strapi.db
      .query("api::route.route")
      .findWithCount({
        select: [],
        where: { client: { id: clientid } },
      });
    console.log("count == ", count);
    return count;
  },

  async monthCountRoute() {
    const count = await axios.get(`${process.env.NODE_URL}/routesall`);

    return count.data;
  },
  async byClientId(ctx) {
    console.log("HERE");
    const { clientid } = ctx.params;
    const entries = await strapi.entityService.findMany("api::route.route", {
      filter: {
        client: {
          id: clientid,
        },
      },
    });
    let routeData = [];
    entries?.map((item) => {
      routeData.push(moment(item.createdAt).format("MM"));
    });
    console.log("count == ", routeData);

    const obj = {
      "01": 0,
      "02": 0,
      "03": 0,
      "04": 0,
      "05": 0,
      "06": 0,
      "07": 0,
      "08": 0,
      "09": 0,
      10: 0,
      11: 0,
      12: 0,
    };

    routeData?.map((item) => {
      obj[item] = obj[item] + 1;
    });

    let index = Object.keys(obj).sort();

    // iterate method
    let details = [];
    index.forEach((key) => {
      console.log(key, obj[key]);
      details.push(obj[key]);
    });
    console.log(details, "details");

    // console.log("count == ",count);
    return details;
  },
}));
