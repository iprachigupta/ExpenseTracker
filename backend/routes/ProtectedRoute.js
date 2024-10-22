const verifyToken = require("../middlewares/VerifyToken");
const router = require("express").Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Welcome to Dashboard",
  });
});


module.exports = router;
