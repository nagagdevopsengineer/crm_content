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
          accessKeyId: 'AKIAUXZPX2IZRSLMWC3S',
          secretAccessKey: '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',
          region: 'ap-south-1',
          params: {
            Bucket: 'g4s-bucket1',
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