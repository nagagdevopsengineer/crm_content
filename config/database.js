module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '3.7.138.38'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'rohit-postgres'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'P@ssw0rd@123'),
      ssl: env.bool('DATABASE_SSL', false),
    },
    acquireConnectionTimeout: 1000000,
pool: {
min: 0,
max: 1,
acquireTimeoutMillis: 300000,
createTimeoutMillis: 300000,
destroyTimeoutMillis: 300000,
idleTimeoutMillis: 30000,
reapIntervalMillis:1000,
createRetryIntervalMillis: 2000
},
debug: false,
  },
});
