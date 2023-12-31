const router = require('express').Router();
const { Gig } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newGig = await Gig.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newGig);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const gigData = await Gig.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!gigData) {
      res.status(404).json({ message: 'No gig found with this id!' });
      return;
    }

    res.status(200).json(gigData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update product data
  Gig.update(req.body, {
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((gig) => {

      return res.json(gig);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;