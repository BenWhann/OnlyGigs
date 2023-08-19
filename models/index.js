const User = require('./User');
const Gig = require('./Gig');
const Comment = require('./Comment')

User.hasMany(Gig, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Gig.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: "user_id"
})

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "band_id"
})

Comment.belongsTo(User, {
  foreignKey: "band_id",
});

module.exports = { User, Gig, Comment };