const User = require('./user');
const Gig = require('./Gig');

User.hasMany(Gig, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Gig.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Gig };