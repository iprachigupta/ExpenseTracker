const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const body_parser = require("body-parser");

const AuthRoute = require("./routes/AuthRoute");
const ProtectedRoute = require("./routes/ProtectedRoute");
const TransactionRoute = require('./routes/TransactionRoute');
const ProfileRoute = require("./routes/ProfileRoute");
const SettingsRoute = require("./routes/SettingsRoute");

const verifyToken = require("./middlewares/VerifyToken");

const corsOptions = {
  origin: "http://localhost:5173", // Allow your frontend's origin
  credentials: true, // Allow cookies and credentials to be sent
};

require("dotenv").config();
require("./models/db");

app.use(cors(corsOptions));
app.use(body_parser.json()); //can use app.use(express.json()) instead of body parser
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request at ${req.originalUrl}`);
//   next();
// });

app.use("/auth", AuthRoute);
app.use("/api/user/dashboard", ProtectedRoute);
app.use("/api/user/expenses", verifyToken, TransactionRoute);
app.use("/api/user/profile", verifyToken, ProfileRoute);
app.use("/api/user", verifyToken, SettingsRoute);

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
