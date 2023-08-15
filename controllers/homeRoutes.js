const router = require("express").Router();
const { Band, Gig, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  });
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

router.get('/dashboard',  withAuth, async (req, res) => {
  try {
    const bandData = await Band.findByPk(req.session.band_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Gig }],
    });

    const band = bandData.get({ plain: true });


    res.render('dashboard', {
      ...band,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
