'use strict';

/**
 * bus-driver service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bus-driver.bus-driver');
