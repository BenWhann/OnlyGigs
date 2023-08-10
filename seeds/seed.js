const sequelize = require("../config/connection");
const User = require("../models/user");
const dishData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(dishData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
