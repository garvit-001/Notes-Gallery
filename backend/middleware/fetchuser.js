var jwt = require("jsonwebtoken");
const JWT_SECRET = "nice@app";

const fetchuser = (req, res, next) => {
  // get user from jwt token and add id to req object
  const token = req.header("authToken");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    // next is that function which is just after the fetchuser middleware
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
