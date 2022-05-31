module.exports = ({ env }) => ({
   /** upload: {
      config: {
        breakpoints: {
          xlarge: 1920,
          large: 1000,
          medium: 750,
          small: 500,
          xsmall: 64
        },
      },
    },*/ 

    upload: {
      config: {
        breakpoints: {
          xlarge: 1920,
          large: 1000,
          medium: 750,
          small: 500,
          xsmall: 64
        },
        provider: 'aws-s3',
        providerOptions: {
          accessKeyId: 'AKIAS3SGCEIKIAV5VH2E',
          secretAccessKey: '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',
          region: 'us-east-2',
          params: {
            Bucket: 'arrivnowcontents',
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      }
    },
  });