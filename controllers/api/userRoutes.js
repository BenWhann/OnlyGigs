const router = require('express').Router();
const { User } = require('../../models');


router.post('/login', async (req, res) => {
    
    try {
        console.log('worked');
        console.log(req.body);
        const userData = await User.create(req.body);
        
    
          res.status(200).json(userData);
        
      } catch (err) {
        console.error(err);
        res.status(400).json(err);
      }
  });

  module.exports = router;