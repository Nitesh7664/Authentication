const router = require("express").Router();
const jwt = require("jsonwebtoken");

const verify = require("../middleware/verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    post_id: "01",
    post_content: "hello ji hello",
  });
});

module.exports = router;
