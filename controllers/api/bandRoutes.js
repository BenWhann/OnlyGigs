const router = require("express").Router();
const { Band } = require("../../models");

router.post("/signup", async (req, res) => {
  try {
    console.log("worked");
    console.log(req.body);
    const bandData = await Band.create(req.body);

    res.status(200).json(bandData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const bandData = await Band.findOne({ where: { email: req.body.email } });

    if (!bandData) {
      res.status(400).json({ message: "Incorrect email, please try again" });
      return;
    }

    const validPassword = await bandData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.band_id = bandData.id;
      req.session.logged_in = true;

      res.json({ band: bandData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
