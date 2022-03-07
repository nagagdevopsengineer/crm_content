'use strict';

/**
 * Lifecycle callbacks for the `Post` model.
 */

module.exports = {  
  afterCreate: async (entry) => {
    console.log('afterCreate ==>>> ' , entry);

    const {data} =  axios.get("http://localhost:8081/api/users", entry)
          .catch(() => {
              // Ignore
          });
        
          console.log("  response from user mgmt  ",data);
    
  },

  afterUpdate: async (entry) => {
    console.log('afterUpdate');
  },

  afterDestroy: async (entry) => {
    console.log('afterDestroy');
  }
};