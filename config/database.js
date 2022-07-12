module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'sales-demo1.c7fgca1gf3e6.us-east-2.rds.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'sales-demo1'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'Welcome2vapprtech'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
