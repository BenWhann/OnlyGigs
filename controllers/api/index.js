const router = require('express').Router();
const bandRoutes = require('./bandRoutes');
const userRoutes = require('./userRoutes');
const gigRoutes = require('./gigRoutes');

router.use('/bands', bandRoutes);
router.use('/user', userRoutes);
router.use('/gig', gigRoutes);

module.exports = router;