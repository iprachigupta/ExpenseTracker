const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      console.error("Access Denied: No refresh token provided.");
      return res.status(403).json({ message: "Access Denied" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        console.error("Invalid Refresh Token:", err.message);
        return res.status(403).json({ message: "Invalid Refresh Token.", success: false });
      }

      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5m" } 
      );

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 5 * 60 * 1000
      });
      
      req.user = user;
      next();
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.error("Invalid Access Token:", err.message);
        return res.status(403).json({ message: "Invalid Access Token.", success: false });
      }

      req.user = user;
      next(); 
    });
  }
};

module.exports = verifyToken;
