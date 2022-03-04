'use strict';

/**
 * bus-driver router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::bus-driver.bus-driver');
