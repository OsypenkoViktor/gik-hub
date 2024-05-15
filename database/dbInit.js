const { Sequelize } = require("sequelize");
require("dotenv").config();

// Инициализируем объект Sequelize с настройками подключения к базе данных
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    pool: {
      max: 15,
      min: 0,
      idle: 10000,
      acquire: 10000,
    },
  }
);

// Проверяем соединение с базой данных
try {
  await sequelize.authenticate().then(() => {
    console.log("Подключение к базе данных успешно!");
  });
} catch (error) {
  console.error("Ошибка подключения к базе данных:", error);
}

export default sequelize;
