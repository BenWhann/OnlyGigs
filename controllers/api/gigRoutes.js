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

// router.put('/:id', (req, res) => {
//   // update product data
//   Gig.update(req.body, {
//     where: {
//       id: req.params.id,
//       user_id: req.session.user_id,
//     },
//   })
//     .then((product) => {
//       if (req.body.tagIds && req.body.tagIds.length) {

//         ProductTag.findAll({
//           where: { product_id: req.params.id }
//         }).then((productTags) => {
//           // create filtered list of new tag_ids
//           const productTagIds = productTags.map(({ tag_id }) => tag_id);
//           const newProductTags = req.body.tagIds
//             .filter((tag_id) => !productTagIds.includes(tag_id))
//             .map((tag_id) => {
//               return {
//                 product_id: req.params.id,
//                 tag_id,
//               };
//             });

//           // figure out which ones to remove
//           const productTagsToRemove = productTags
//             .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//             .map(({ id }) => id);
//           // run both actions
//           return Promise.all([
//             ProductTag.destroy({ where: { id: productTagsToRemove } }),
//             ProductTag.bulkCreate(newProductTags),
//           ]);
//         });
//       }

//       return res.json(product);
//     })
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

module.exports = router;