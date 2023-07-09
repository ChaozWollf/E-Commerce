const express = require('express');
const routes = require('./routes');
const sequelize = require('../config/connection.js')
const app = express();
const PORT = process.env.PORT || 3001;

const sequelizes = new Sequelize(
  // Database name
  DB_NAME='ecommerce_db',
  // User
  DB_USER ='root',
  // Password
  DB_PASSWORD='MySql',
  {
    // Database location
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  }
);

// import sequelize connection



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


await sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");


// sync sequelize models to the database, then turn on the server



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
