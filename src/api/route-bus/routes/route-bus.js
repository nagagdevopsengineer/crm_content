'use strict';

/**
 * route-bus router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::route-bus.route-bus');
