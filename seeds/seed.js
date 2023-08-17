const sequelize = require("../config/connection");
const User = require("../models/user");
const { Gig } = require("../models");
const userData = require("./userData.json");
const gigData = require("./gigData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Gig.bulkCreate(gigData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
