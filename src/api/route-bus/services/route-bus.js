'use strict';

/**
 * route-bus service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::route-bus.route-bus');
