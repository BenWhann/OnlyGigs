const sequelize = require("../config/connection");
const User = require("../models/User");
const dishData = require("./dish-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Dish.bulkCreate(dishData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
