'use strict';
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const bootstrap =  async () => {
  console.log("Current environment", process.env.NODE_ENV);
  
    const status = ['pending', 'approved', 'rejected']
    const vaccinationstatus = ['No', 'Partial', 'Vaccinated']
    const driverHelperStatus = ['Created', 'Approved', 'Rejected']
    const busStatus = ['pending', 'approved', 'reject']
    const flag = [true, false]
    const shiftName = ['morning', 'afternoon', 'evening', 'night']
    const rideDetailType = ['ola', 'uber']
    const routeNames = ['Sanjay Gram To RPS', 'EmaarIndia To OM Sweet', 'Magnum Tower To Samsung Office', 'Sector Fifty Three Rapid Metro to Magnum Towers', 'Huda Metro to Guru Dronacharya Metro']

    //Deleting any existing data in the database for clients
    let entries = await strapi.entityService.findMany('api::client.client', {
      fields: ['id']    
    }); 
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for clients")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::client.client', entry.id);
      })
    }

    //Deleting any existing data in the database for contractors
    entries = await strapi.entityService.findMany('api::contractor.contractor', {
      fields: ['id']    
    }); 
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for contractors")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::contractor.contractor', entry.id);
      })
    }

    //Deleting any existing data in the database for buses
    entries = await strapi.entityService.findMany('api::bus.bus', {
      fields: ['id']    
    }); 
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for buses")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::bus.bus', entry.id);
      })
    }

    //Deleting any existing data in the database for driver
    entries = await strapi.entityService.findMany('api::driver.driver', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for driver")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::driver.driver', entry.id);
      })
    }

    //Deleting any existing data in the database for helper
    entries = await strapi.entityService.findMany('api::helper.helper', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for helper")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::helper.helper', entry.id);
      })
    }

    //Deleting any existing data in the database for employee
    entries = await strapi.entityService.findMany('api::employee.employee', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for employee")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::employee.employee', entry.id);
      })
    }


    //Deleting any existing data in the database for bus-driver
    entries = await strapi.entityService.findMany('api::bus-driver.bus-driver', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for buses")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::bus-driver.bus-driver', entry.id);
      })
    }

    //Deleting any existing data in the database for employee setting
    entries = await strapi.entityService.findMany('api::setting.setting', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for employee setting")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::setting.setting', entry.id);
      })
    }

    //Deleting any existing data in the database for shift time
    entries = await strapi.entityService.findMany('api::shifttime.shifttime', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for shift time")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::shifttime.shifttime', entry.id);
      })
    }

    //Deleting any existing data in the database for client shift timing
    entries = await strapi.entityService.findMany('api::client-shift-timing.client-shift-timing', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for client shift timing")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::client-shift-timing.client-shift-timing', entry.id);
      })
    }

    //Deleting any existing data in the database for employee emergency contact
    entries = await strapi.entityService.findMany('api::employee-emergency-contact.employee-emergency-contact', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for employee emergency contact")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::employee-emergency-contact.employee-emergency-contact', entry.id);
      })
    }

    //Deleting any existing data in the database for employee ride detail
    entries = await strapi.entityService.findMany('api::ride-detail.ride-detail', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for employee ride detail")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::ride-detail.ride-detail', entry.id);
      })
    }

    //Deleting any existing data in the database for routes
    entries = await strapi.entityService.findMany('api::route.route', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for routes")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::route.route', entry.id);
      })
    }

    //Deleting any existing data in the database for stops
    entries = await strapi.entityService.findMany('api::stop.stop', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for stops")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::stop.stop', entry.id);
      })
    }

    //Deleting any existing data in the database for sos logs
    entries = await strapi.entityService.findMany('api::sos-log.sos-log', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for sos logs")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::sos-log.sos-log', entry.id);
      })
    }

    //Deleting any existing data in the database for route-bus
    entries = await strapi.entityService.findMany('api::route-bus.route-bus', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for route-bus")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::route-bus.route-bus', entry.id);
      })
    }

    //Deleting any existing data in the database for trips
    entries = await strapi.entityService.findMany('api::trip.trip', {
      fields: ['id']    
    });
    if (entries && entries.length) {
      console.log("Deleting any existing data in the database for trips")
      entries.forEach( async (entry) => {
        await strapi.entityService.delete('api::trip.trip', entry.id);
      })
    }

    
    //Creating synthetic data for client
    console.log("Creating synthetic data for client")
    const start_index = 1
    const end_index = start_index + 50
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::client.client', {
          data: {
            id: index,
            name: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            registration_number: faker.random.alphaNumeric(15),
            gstnumber: `GST${faker.random.alphaNumeric(10)}`,
            status: status[Math.floor(Math.random()*status.length)],
            uuid: uuidv4(),
            mobile: Math.floor(Math.random() * 9000000000) + 1000000000,
            address: `${faker.address.streetName()} ${faker.address.streetAddress()}`,
            companyname: faker.company.companyName(),
            pancard: faker.random.alphaNumeric(10),
            publishedAt: new Date().toISOString()
          }
        })}
      catch(err) {
        console.log("Error while synthetic data for clients", err)
      } 
    }

    //Creating synthetic data for contractor
    console.log("Creating synthetic data for contractor")
    let clients = await strapi.entityService.findMany('api::client.client', {
      fields: ['id']    
    }); 
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::contractor.contractor', {
          data: {
            id: index,
            name: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            reg_number: faker.random.alphaNumeric(15),
            gst: `GST${faker.random.alphaNumeric(10)}`,
            status: status[Math.floor(Math.random()*status.length)],
            uuid: uuidv4(),
            contactnumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            address: `${faker.address.streetName()} ${faker.address.streetAddress()}`,
            companyname: faker.company.companyName(),
            pancard: faker.random.alphaNumeric(10),
            client: clients[Math.floor(Math.random()*clients.length)].id,
            publishedAt: new Date().toISOString()
          },
        })}
      catch(err) {
        console.log("Error while synthetic data for contractors", err)
      }
    }

    // Creating synthetic data for buses
    console.log("Creating synthetic data for buses")
    let contractors = await strapi.entityService.findMany('api::contractor.contractor', {
      fields: ['id']    
    }); 
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::bus.bus', {
        data: {
          id: index,
          vehicle_number: faker.vehicle.vrm(),
          colour: faker.vehicle.color(),
          seating_capacity: 50,
          status: busStatus[Math.floor(Math.random()*busStatus.length)],
          contractor: contractors[Math.floor(Math.random()*contractors.length)].id,
          uuid: uuidv4(),
          puc: 'random',
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for buses", err)
      }
    }

    // Creating synthetic data for driver
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::driver.driver', {
        data: {
          id: index,
          name: faker.name.firstName(),
          age: Math.floor(Math.random() * (50 - 18 + 1) + 18),
          driving_licence_number: faker.vehicle.vin(),
          aadhar: faker.random.alphaNumeric(12).toUpperCase(),
          contractor: contractors[Math.floor(Math.random()*contractors.length)].id,
          uid: uuidv4(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          vaccinationstatus: vaccinationstatus[Math.floor(Math.random()*vaccinationstatus.length)],
          statusreason: faker.random.word(),
          status: driverHelperStatus[Math.floor(Math.random()*driverHelperStatus.length)],
          mobile: Math.floor(Math.random() * 9000000000) + 1000000000,
          driverid: `DRIVER: ${faker.random.alphaNumeric(5).toUpperCase()}`,
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for driver", err)
      }
    }

    // Creating synthetic data for helper
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::helper.helper', {
        data: {
          id: index,
          name: faker.name.firstName(),
          age: Math.floor(Math.random() * (50 - 18 + 1) + 18),
          drivinglicense: faker.vehicle.vin(),
          aadharnumber: Math.floor(Math.random() * 9000000000) + 100000000000,
          contractor: contractors[Math.floor(Math.random()*contractors.length)].id,
          uuid: uuidv4(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          vaccination_status: vaccinationstatus[Math.floor(Math.random()*vaccinationstatus.length)],
          statusreason: faker.random.word(),
          status: driverHelperStatus[Math.floor(Math.random()*driverHelperStatus.length)],
          contact_number: Math.floor(Math.random() * 9000000000) + 1000000000,
          helperid: `HELPER: ${faker.random.alphaNumeric(5).toUpperCase()}`,
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for helper", err)
      }
    }

    // Creating synthetic data for employee
    let buses = await strapi.entityService.findMany('api::bus.bus', {
      fields: ['id']    
    }); 
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::employee.employee', {
        data: {
          id: index,
          name: faker.name.firstName(),
          is_activated: flag[Math.floor(Math.random()*flag.length)],
          aadhar: Math.floor(Math.random() * 9000000000) + 100000000000,
          uuid: uuidv4(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          vaccinestatus: vaccinationstatus[Math.floor(Math.random()*vaccinationstatus.length)],
          contact: Math.floor(Math.random() * 9000000000) + 1000000000,
          employeeid: `EMPLOYEE: ${faker.random.alphaNumeric(5).toUpperCase()}`,
          address: `${faker.address.streetName()} ${faker.address.streetAddress()}`,
          lastmile: flag[Math.floor(Math.random()*flag.length)],
          client: clients[Math.floor(Math.random()*clients.length)].id,
          bus: buses[Math.floor(Math.random()*buses.length)].id,
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for employee", err)
      }
    }


    // Creating synthetic data for bus-driver
    console.log("Creating synthetic data for bus-driver")
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::bus-driver.bus-driver', {
        data: {
          id: index,
          bus: index,
          driver: index,
          helper: index,
          from_date: faker.date.past().toISOString().split('T')[0],
          to_date: faker.date.future().toISOString().split('T')[0],
          timing: `${"5678".toHHMMSS()}`,
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for bus-driver", err)
      }
    }

    // Creating synthetic data for employee setting
    console.log("Creating synthetic data for employee setting")
    let employees = await strapi.entityService.findMany('api::employee.employee', {
      fields: ['id']    
    });
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::setting.setting', {
        data: {
          id: index,
          notification: flag[Math.floor(Math.random()*flag.length)],
          driver_journey_started: flag[Math.floor(Math.random()*flag.length)],
          previous_stop_alert: flag[Math.floor(Math.random()*flag.length)],
          employee: employees[Math.floor(Math.random()*employees.length)].id,
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for bus-driver", err)
      }
    }

    // Creating synthetic data for shift time
    console.log("Creating synthetic data for shift time")
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::shifttime.shifttime', {
        data: {
          id: index,
          shiftname: shiftName[Math.floor(Math.random()*shiftName.length)],
          startTime: faker.date.past().toISOString().split('T')[0],
          endTime: faker.date.future().toISOString().split('T')[0],
          isActive: flag[Math.floor(Math.random()*flag.length)],
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for shift time", err)
      }
    }

    // Creating synthetic data for client shift timing
    console.log("Creating synthetic data for client shift timing")
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::client-shift-timing.client-shift-timing', {
        data: {
          id: index,
          client: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
          shifttime: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for client shift timing", err)
      }
    }

    // Creating synthetic data for employee emergency contact
    console.log("Creating synthetic data for employee emergency contact")
    for (let index = start_index ; index < 151; index++) {
      try {
        await strapi.entityService.create('api::employee-emergency-contact.employee-emergency-contact', {
        data: {
          id: index,
          employee: index % 50 + 1,
          mobile: Math.floor(Math.random() * 9000000000) + 1000000000,
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for employee emergency contact", err)
      }
    }

    // Creating synthetic data for employee ride detail
    console.log("Creating synthetic data for employee ride detail")
    for (let index = start_index ; index < 151; index++) {
      try {
        await strapi.entityService.create('api::ride-detail.ride-detail', {
        data: {
          id: index,
          employee: index % 50 + 1,
          ride: rideDetailType[Math.floor(Math.random()*rideDetailType.length)],
          date: faker.date.past().toISOString().split('T')[0],
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for employee ride detail", err)
      }
    }

    // Creating synthetic data for routes
    console.log("Creating synthetic data for routes")
    for (let index = start_index ; index < 6; index++) {
      try {
        await strapi.entityService.create('api::route.route', {
        data: {
          id: index,
          name: routeNames[index - 1],
          description: routeNames[index - 1],
          client: index,
          Km: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
          publishedAt: new Date().toISOString()
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for routes", err)
      }
    }

    // Creating synthetic data for stops
    const stops = [ {name: `Sanjay Gram` , longitude: 77.0417, latitude: 28.4781, route: 1, order: 1},
                    {name: `C Block Road, Sanjay Gram Colony, Rajiv Nagar, Sector 13, Gurugram, Haryana` , longitude: 77.0425654, latitude: 28.4778707, route: 1, order: 2},
                    {name: `Khelgram Sports Academy, Sanjay Gram Colony, Rajiv Nagar, Sector 13, Gurugram, Haryana, India`, longitude: 77.0425333, latitude: 28.4788431, route: 1, order: 3},
                    {name: `Sanjay Gram Colony, Rajiv Nagar, Sector 13, Gurugram, Haryana 122022, India`, longitude: 77.0416967, latitude: 28.4780596, route: 1,order: 4},
                    {name: `RPS` , longitude: 77.0529341698, latitude: 28.4193531438, route: 1, order: 5},
                    {name: `EmaarIndia`,longitude: 77.1290223,latitude: 28.7248935,route: 2,order: 1},
                    {name: `Ambience Mall`,longitude: 77.0958,latitude: 28.5058,route: 2,order: 2},
                    {name: `National Rail Museum`,longitude:  77.1814,latitude: 28.5850,route: 2,order: 3},
                    {name: `Nizamuddin Railway Station`,longitude: 77.2534,latitude: 28.5889,route: 2,order: 4},
                    {name: `Om Sweets & Restaurant`,longitude: 77.50411,latitude: 28.60139,route: 2,order: 5},
                    {name: `Magnum Towers`,longitude: 77.1084,latitude: 28.4120,route: 3,order: 1},
                    {name: `DoubleTree by Hilton Hotel`,longitude: 77.1045,latitude: 28.4220,route: 3,order: 2},
                    {name: `Centrum Plaza`,longitude: 77.1042,latitude: 28.4339,route: 3,order: 3},
                    {name: `Hotel Metro Residency`,longitude: 77.09472,latitude: 28.45592,route: 3,order: 4},
                    {name: `Samsung India Electronics Gurugram`,longitude: 77.09609,latitude: 28.45230,route: 3,order: 5},
                    {name: `Sector Fifty Three Rapid Metro`,longitude: 77.50411,latitude: 28.60139,route: 4,order: 1},
                    {name: `Centrum Plaza`,longitude: 77.1042,latitude: 28.4339,route: 4,order: 2},
                    {name: `Hotel Metro Residency`,longitude: 77.09472,latitude: 28.45592,route: 4,order: 3},
                    {name: `Samsung India Electronics Gurugram`,longitude: 77.09609,latitude: 28.45230,route: 4,order: 5},
                    {name: `Magnum Towers`,longitude: 77.1084,latitude: 28.4120,route: 4,order: 5},
                    {name: `Huda Metro`,longitude: 77.0724791115211, latitude: 28.459378884371876, route: 5,order: 1},
                    {name: `Supermart-1, DLF Phase IV`,longitude: 77.08754250049124, latitude: 28.462299539344333, route: 5,order: 2},
                    {name: `DLF Phase 5, Sector 43`,longitude: 77.09492393983676, latitude: 28.463469107200353, route: 5,order: 3},
                    {name: `Phase 1, Chakkarpur, Sector 28`,longitude: 77.09393688690102, latitude: 28.47135392043445, route: 5,order: 4},
                    {name: `Guru Dronacharya Metro Station Gate No 2`,longitude:77.10264870194253, latitude:  28.482369037802915, route: 5,order: 5}]
    console.log("Creating synthetic data for stops")
    for (let index = 0 ; index < stops.length + 1; index++) {
      try {
        await strapi.entityService.create('api::stop.stop', {
          data: {
            id: index + 1,
            name: stops[index].name,
            longitude: stops[index].longitude,
            latitude: stops[index].latitude,
            route: stops[index].route,
            order: stops[index].order,
            publishedAt: new Date().toISOString()
          }
        })}
      catch(err) {
        console.log("Error while synthetic data for stops", err)
      }
    }

    // Creating synthetic data for sos logs
    console.log("Creating synthetic data for sos logs")
    for (let index = 1 ; index < 151; index++) {
      const nearbyGPSCoordinate = faker.address.nearbyGPSCoordinate()
      try {
        await strapi.entityService.create('api::sos-log.sos-log', {
          data: {
            id: index,
            sms: faker.lorem.words(),
            location: faker.address.cityName(),
            lat: nearbyGPSCoordinate[0],
            long: nearbyGPSCoordinate[1],
            employee: index % 50 + 1,
            mobile: Math.floor(Math.random() * 9000000000) + 1000000000,
            publishedAt: new Date().toISOString()
          }
        })}
      catch(err) {
        console.log("Error while synthetic data for sos logs", err)
      }
    }
    
    // Creating synthetic data for route-bus
    console.log("Creating synthetic data for route-bus")
    for (let index = start_index ; index < end_index; index++) {
      try {
        await strapi.entityService.create('api::route-bus.route-bus', {
          data: {
            id: index,
            bus: index,
            route: index % 5 + 1,
            from_date: faker.date.past().toISOString().split('T')[0],
            to_date: faker.date.future().toISOString().split('T')[0],
            time: `${"5678".toHHMMSS()}`,
            publishedAt: new Date().toISOString()
          }
        })}
      catch(err) {
        console.log("Error while synthetic data for route-bus", err)
      }
    }

    // Creating synthetic data for trips
    console.log("Creating synthetic data for trips")
    for (let index = start_index ; index < 201; index++) {
      let date = faker.date.past().toISOString();
      try {
        await strapi.entityService.create('api::trip.trip', {
          data: {
            id: index,
            tripdate: date.split('T')[0],
            uuid: uuidv4(),
            starttime: date,
            endtime: faker.date.recent().toISOString(),
            route_bus: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
            isstarted: flag[Math.floor(Math.random()*flag.length)],
            isended: flag[Math.floor(Math.random()*flag.length)],
            bus_driver: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
            scheduledtime: faker.date.past().toISOString(),
            Km: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
            publishedAt: new Date().toISOString()
          }
        })}
      catch(err) {
        console.log("Error while synthetic data for trips", err)
      }
    }

}

module.exports =  bootstrap


String.prototype.toHHMMSS = function () {
  let sec_num = parseInt(this, 10);
  let hours   = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours + ':' + minutes + ':' + seconds;
}