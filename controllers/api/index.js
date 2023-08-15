const router = require('express').Router();
const bandRoutes = require('./bandRoutes');
const gigRoutes = require('./gigRoutes');

router.use('/bands', bandRoutes);
router.use('/gig', gigRoutes);

module.exports = router;