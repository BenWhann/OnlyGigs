const router = require("express").Router();
const { User, Gig, Band } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const gigData = await Gig.findAll({
      include: [
        {
          model: Band,
          attributes: ["band_name"],
        },
      ],
    });
    // Serialize data so the template can read it
    const gigs = gigData.map((gig) => gig.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
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
    const bandData = await Band.findByPk(req.session.band_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Gig }],
    });

    const band = bandData.get({ plain: true });

    res.render("dashboard", {
      ...band,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/:id", withAuth, async (req, res) => {
  try {
    const bandData = await Band.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Gig }],
    });
    const band = bandData.get({ plain: true });
    res.render("dashboard", {
      ...band,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
