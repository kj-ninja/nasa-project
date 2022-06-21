const config = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "kjninja",
    host: process.env.MYSQL_URL,
    dialect: "mysql"
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "kjninja",
    host: process.env.MYSQL_URL,
    dialect: "mysql"
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "kjninja",
    host: process.env.MYSQL_URL,
    dialect: "mysql"
  }
};

module.exports = config;
