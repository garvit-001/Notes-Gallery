const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "nice@app";

//Route 1 :  create a user using :POST "/api/auth/createuser",,, does not require auth
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password to too short").isLength({ min: 5 }),
    body("name", "Name is too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if therenare error, return bad request and error
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether user with the same email exist alreay
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send({
          success,
          error: "Sorry, user with the same email alredy exist",
        });
      }
      if (req.body.password !== req.body.cpassword) {
        return res
          .status(400)
          .send("password and confirm password do not match");
      }
      // with this we are generating hashed password,, see mongo Or thunder-client
      const salt = await bcrypt.genSalt(10);
      secPassword = await bcrypt.hash(req.body.password, salt);

      // If user is not there, then create a new user with provided data
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Some error occured");
    }
    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({
    //     error: "Please Enter a unique email address",
    //   });
    // });
  }
);

//Route 2 : Authenticate a user using :POST "/api/auth/createuser",,, does not require login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password to too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, errors: "Enter valid credentials" });
      }

      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          .status(400)
          .json({ success, errors: "Enter valid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal server error");
    }
  }
);

//Route 3 : Get user detail using :POST "/api/auth/getuser",,, require login

// fetchuser is a middleware to follow DRY principle
router.post("/fetchuser", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ errors: "Enter valid credentials" });
    }
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
