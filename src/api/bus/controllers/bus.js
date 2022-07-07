"use strict";

const { default: axios } = require("axios");

/**
 *  bus controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::bus.bus", ({ env }) => ({
  async findAvailableBuses(ctx) {
    const { contractorid } = ctx.params;

    const mappedDriversAndHelpersBuses = await strapi.entityService.findMany(
      "api::bus-driver.bus-driver",
      {
        filters: {
          driver: {
            contractor: {
              id: contractorid,
            },
          },
        },
        populate: { bus: true },
      }
    );

    let buses = [];

    await mappedDriversAndHelpersBuses.forEach((element) => {
      buses.push(element.bus.id);
    });

    const avaialbeBuses = await strapi.entityService.findMany("api::bus.bus", {
      filters: {
        contractor: {
          id: contractorid,
        },

        id: {
          $notIn: buses,
        },
      },
    });

    return avaialbeBuses;
  },

  async findAvailableBusesForRoutes(ctx) {
    const { contractorid } = ctx.params;

    const mappedRoutesAndBuses = await strapi.entityService.findMany(
      "api::route-bus.route-bus",
      {
        filters: {
          bus: {
            contractor: {
              id: contractorid,
            },
          },
        },
        populate: { bus: true },
      }
    );

    let buses = [];

    await mappedRoutesAndBuses.forEach((element) => {
      buses.push(element.bus.id);
    });

    const avaialbeBuses = await strapi.entityService.findMany("api::bus.bus", {
      filters: {
        contractor: {
          id: contractorid,
        },

        id: {
          $notIn: buses,
        },
      },
    });

    return avaialbeBuses;
  },

  async buscountbycontractor(ctx) {
    const { contid } = ctx.params;
    const [entries, count] = await strapi.db
      .query("api::bus.bus")
      .findWithCount({
        select: [],
        where: { contractor: { id: contid } },
      });
    console.log("count == ", count);
    return count;
  },
  async allBuses(ctx) {
    const [entries, count] = await strapi.db
      .query("api::bus.bus")
      .findWithCount({
        select: [],
      });
    console.log("count == ", count);
    return count;
  },

  async busByMonth() {
    const avaialbeBuses = await strapi.entityService.findMany("api::bus.bus", {
      filters: {
        id: {
          $notIn: buses,
        },
      },
    });

    return avaialbeBuses;
  },

  async busByMonthCount(ctx) {
    const avaialbeBuses = await axios.get(`${process.env.NODE_URL}/all`);

    return avaialbeBuses.data;
  },
  async customerRating(ctx) {
    console.log("tetsts");
    const data = await axios.get(`${process.env.NODE_URL}/ratings`);

    return data.data;
  },

  async buscountbyclient(ctx) {
    const { clientid } = ctx.params;
    console.log(" client id  ", clientid);
    const [responseBus, countBus] = await strapi.db
      .query("api::bus.bus")
      .findWithCount({
        where: {
          contractor: {
            client: {
              id: clientid,
            },
          },
        },
      });
    const [responsedriver, countDriver] = await strapi.db
      .query("api::driver.driver")
      .findWithCount({
        where: {
          contractor: {
            client: {
              id: clientid,
            },
          },
        },
      });
    const [responsehelper, countHelper] = await strapi.db
      .query("api::helper.helper")
      .findWithCount({
        where: {
          contractor: {
            client: {
              id: clientid,
            },
          },
        },
      });
    var response = {
      buses: countBus,
      helpers: countHelper,
      drivers: countDriver,
    };
    return response;
  },
}));
