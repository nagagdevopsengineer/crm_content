'use strict';
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const bootstrap =  async () => {

  if (process.env.NODE_ENV == 'sales-demo') {
  
    const status = ['pending', 'approved', 'rejected']
    const vaccinationstatus = ['No', 'Partial', 'Vaccinated']
    const driverHelperStatus = ['Created', 'Approved', 'Rejected']
    const busStatus = ['pending', 'approved', 'reject']
    const flag = [true, false]

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
            pancard: faker.random.alphaNumeric(10)
          },
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
            client: clients[Math.floor(Math.random()*clients.length)].id
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
          puc: 'random'
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
          driverid: `DRIVER: ${faker.random.alphaNumeric(5).toUpperCase()}`
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
          helperid: `HELPER: ${faker.random.alphaNumeric(5).toUpperCase()}`
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
          bus: buses[Math.floor(Math.random()*buses.length)].id
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
          helper: index
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
        },
      })}
      catch(err) {
        console.log("Error while synthetic data for bus-driver", err)
      }
    }
  }
}

module.exports =  bootstrap
