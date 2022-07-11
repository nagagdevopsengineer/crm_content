'use strict';
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const bootstrap =  async () => {
  
  const status = ['pending', 'approved', 'rejected']
  const vaccinationstatus = ['No', 'Partial', 'Vaccinated']
  const driverHelperStatus = ['Created', 'Approved', 'Rejected']
  const busStatus = ['pending', 'approved', 'reject']

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


  // //Deleting any existing data in the database for bus-driver
  // entries = await strapi.entityService.findMany('api::bus-driver.bus-driver', {
  //   fields: ['id']    
  // });
  // if (entries && entries.length) {
  //   console.log("Deleting any existing data in the database for buses")
  //   entries.forEach( async (entry) => {
  //     await strapi.entityService.delete('api::bus-driver.bus-driver', entry.id);
  //   })
  // }

  
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


  // Creating synthetic data for bus-driver
  // console.log("Creating synthetic data for bus driver")
  // entries = await strapi.entityService.findMany('api::bus-driver.bus-driver', {
  //   fields: ['id']    
  // });
  // start_index = entries[entries.length - 1].id + 1
  // end_index = start_index + 50
  // for (let index = start_index ; index < end_index; index++) {
  //   try {
  //     await strapi.entityService.create('api::bus-driver.bus-driver', {
  //     data: {
  //       id: index,
  //       vehicle_number: faker.vehicle.vrm(),
  //       colour: faker.vehicle.color(),
  //       seating_capacity: 50,
  //       status: 'approved',
  //       contractor: 78,
  //       uuid: uuidv4(),
  //       puc: 'random'
  //     },
  //   })}
  //   catch(err) {
  //     console.log("Error while synthetic data for bus driver", err)
  //   }
  // }

}

module.exports =  bootstrap




function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}