module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'postgresql://arrivnow.cnscjbmeyzwl.us-east-1.rds.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'crm-backend'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'welcome2arrivnow'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
