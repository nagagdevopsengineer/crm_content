module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '93d1799c02400bea0b5f3cfe7792f8b6'),
  },
});
