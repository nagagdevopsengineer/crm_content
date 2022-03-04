const strapi = require('@strapi/strapi');
strapi().start();

const Consul = require('consul');

const consul = new Consul({
    host: 'localhost',
    port: 8500,
    promisify: true,
});

consul.agent.service.register({
    name: serviceName,
    address: 'localhost',
    port: 3000,
    check: {
        http: 'http://localhost:3000/health',
        interval: '10s',
        timeout: '5s',
    }
}, function(err, result) {
    if (err) {
        console.error(err);
        throw err;
    }

    Console.log (servicename + 'registered successfully! ).
})
