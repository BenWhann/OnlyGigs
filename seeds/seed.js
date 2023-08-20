const sequelize = require("../config/connection");
const { Gig, User } = require("../models");
const Comment = require("../models/Comment")
const userData = require("./userData.json");
const gigData = require("./gigData.json");
const commentData = require("./commentData.json")


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

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
