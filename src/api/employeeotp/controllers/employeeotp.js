"use strict";

const employee = require("../../employee/controllers/employee");
const axios = require("axios");
const dotenv = require("dotenv").config();
/**
 *  employeeotp controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::employeeotp.employeeotp",
  ({ env }) => ({
    async update(ctx) {
      const { id } = ctx.params;
     
      const response = await super.update(ctx);
      console.log(response, "responsedata");

      const employeeboadingdata = await strapi.entityService.findMany(
        "api::employeeotp.employeeotp",
        {
          filters: {
            id: {
              $eq: id,
            },
          },
          populate: { employee: true },
        }
      );
    //   console.log(employeeboadingdata, "testing in otp");
      let employeeboarded = [];

      if (employeeboadingdata) {
        employeeboadingdata.map((item) => {
          employeeboarded.push({
            playerid: item.employee.playerid,
            // 'id':item.employee.id,
            name: item.employee.name,
            // 'uuid':item.employee.uuid,
            employeeId: item.employee.employeeid,
            notificationtype: "Boarding notification",
            contenttype: "Boarding Successfull",
          });
        });
        console.log(process.env.BASE_URL,'url')
        const message = axios
          .post(`${process.env.BASE_URL}/notification`, employeeboarded[0], {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log("here");
          })
          .catch((err) => {
            console.log("error", err);
          });
      }
     
      return response;
    },
  })
);
