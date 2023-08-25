const router = require("express").Router();
const { User, Gig, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const is_band = await User.findByPk(req.session.user_id, {
        attributes: ["is_band"],
      });
      var check_user = is_band.get({ plain: true });
    }
    const gigData = await Gig.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // Serialize data so the template can read it
    const gigs = gigData.map((gig) => gig.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      check_user,
      gigs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const is_band = await User.findByPk(req.session.user_id, {
      attributes: ["is_band"],
    });
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Gig }],
    });

    const user = userData.get({ plain: true });
    const check_user = is_band.get({ plain: true });

    res.render("dashboard", {
      check_user,
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/:id", withAuth, async (req, res) => {
  try {
    if (req.session.logged_in) {
      const is_band = await User.findByPk(req.session.user_id, {
        attributes: ["is_band"],
      });

      const band_desc = await User.findByPk(req.params.id, {
        attributes: ["description"],
        include: [
          {
            model: Comment,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      });
      
      var check_user = is_band.get({ plain: true });
      var description = band_desc.get({ plain: true });
    }
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Gig }],
    });
    const user = userData.get({ plain: true });
    res.render("viewdashboard", {
      ...user,
      description,
      check_user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/updategig/:id", (req, res) => {
  Gig.findOne({
    where:{
      id: req.params.id,
    },
    raw: true
  }).then(gig => {
    console.log(gig);
    // const gig = gigData.get({ plain: true });
    res.render("editgig", {gig});
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
  
});

module.exports = router;
