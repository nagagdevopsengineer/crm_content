module.exports = [
  'strapi::errors',
 // 'strapi::security',
  {
    name: "strapi::security",
  config: {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'connect-src': ["'self'", 'https:'],
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'dev-crmcontent.vapprtech.com',
          'arrivnowcontent.s3.us-east-2.amazonaws.com',
        ],
        'media-src': [
          "'self'",
          'data:',
          'blob:',
          'dev-crmcontent.vapprtech.com',
          'arrivnowcontent.s3.us-east-2.amazonaws.com',
        ],
        upgradeInsecureRequests: null,
      },
    },
  },
},
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: "strapi::body",
    config: {
      formLimit: "256mb", // modify form body
      jsonLimit: "256mb", // modify JSON body
      textLimit: "256mb", // modify text body
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
];
