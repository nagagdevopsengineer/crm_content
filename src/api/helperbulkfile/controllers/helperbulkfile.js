"use strict";

/**
 *  helperbulkfile controller
 */
const reader = require("xlsx");
const { createCoreController } = require("@strapi/strapi").factories;
const AWS = require("aws-sdk");
const xlsx = require("xlsx");

module.exports = createCoreController(
  "api::helperbulkfile.helperbulkfile",
  ({ env }) => ({
    async create(ctx) {
      const response = await super.create(ctx);

      console.log(response);

      const fileResponse = await strapi.entityService.findOne(
        "api::helperbulkfile.helperbulkfile",
        response.data.id,
        {
          populate: {
            excelfile: true,
          },
        }
      );

      const fileName = response.data.attributes.filename;

      const s3 = new AWS.S3();

      s3.config.update({
        region: "us-east-2",
        accessKeyId: "AKIAS3SGCEIKIAV5VH2E",
        secretAccessKey: "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",
      });
      var params = {
        Bucket: "arrivnowcontents",
        Key: `${fileName}`,
      };

      var file = s3.getObject(params).createReadStream();

      var buffers = [];
      let dataArray;
      let excel;

      function getBufferFromS3(file, callback) {
        const buffers = [];

        const stream = s3.getObject(params).createReadStream();
        stream.on("data", (data) => buffers.push(data));
        stream.on("end", () => callback(null, Buffer.concat(buffers)));
        stream.on("error", (error) => callback(error));
      }

      function getBufferFromS3Promise(file) {
        return new Promise((resolve, reject) => {
          getBufferFromS3(file, (error, s3buffer) => {
            if (error) return reject(error);
            return resolve(s3buffer);
          });
        });
      }
      // create workbook from buffer
      const buffer = await getBufferFromS3Promise(file);
      const excelData = xlsx.read(buffer);
      let test = Object.keys(excelData.Sheets).map((name) => ({
        name,
        data: xlsx.utils.sheet_to_json(excelData.Sheets[name]),
      }));

      test.forEach((element) => {
        console.log(element.data);
      });
      dataArray = test[0].data;
      console.log(dataArray);

      let finalInsertArray = [];
      for (let i = 0; i < dataArray.length; i++) {
        let statusText = "SUCCESS";
        let status = true;
        let errorObj = "";

        try {
          const entry = await strapi.entityService.create(
            "api::helper.helper",
            {
              data: {
                name: dataArray[i].Full_Name,
                email: dataArray[i].Email_ID,
                contact_number: dataArray[i].Contact_Number,
                publishedAt: new Date().toISOString()
              },
            }
          );
          console.log(entry, "entry")
        } catch (error) {
          statusText = "ERROR";
          status = false;
          let errObj = error.details;

          console.log("error 2 ==>>>> ", errObj);

          for (let i = 0; i < errObj.errors.length; i++) {
            errorObj =
              errorObj +
              i +
              "." +
              errObj.errors[i].path[0] +
              " - " +
              errObj.errors[i].message;
          }
        }

        try {
          const logentry = await strapi.entityService.create(
            "api::helperbulkuploadlog.helperbulkuploadlog",
            {
              data: {
                name: dataArray[i].Full_Name,
                email: dataArray[i].Email_ID,
                mobile: dataArray[i].Contact_Number,
                statustext: statusText,
                error: errorObj,
                status: status,
                helperbulkfile: fileResponse.id,
              },
            }
          );
        } catch (errorl) {}
      }

      return dataArray;
    },
  })
);
