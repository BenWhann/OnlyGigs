const User = require('./user');
const Band = require('./band');
const Gig = require('./Gig');

Band.hasMany(Gig, {
  foreignKey: 'band_id',
  onDelete: 'CASCADE'
});

Gig.belongsTo(Band, {
  foreignKey: 'band_id'
});

module.exports = { User, Band, Gig };