'use strict';

/**
 * sos-log service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sos-log.sos-log');
