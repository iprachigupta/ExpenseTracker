const express = require("express");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");
const AuthRoute = require("./routes/AuthRoute");
const cookieParser = require("cookie-parser");
const ProtectedRoute = require("./routes/ProtectedRoute");
const verifyToken = require("./middlewares/VerifyToken");
const ExpenseRoute = require("./routes/ExpenseRoute");
const User = require("./models/user");
const ProfileRoute = require("./routes/ProfileRoute");

const corsOptions = {
  origin: "http://localhost:5173", // Allow your frontend's origin
  credentials: true, // Allow cookies and credentials to be sent
};


require("dotenv").config();
require("./models/db");


app.use(cors(corsOptions));
app.use(body_parser.json()); //can use app.use(express.json()) instead of body parser
app.use(cookieParser());

app.use("/auth", AuthRoute);
app.use("/api/dashboard", ProtectedRoute);
app.use("/api/expenses", verifyToken, ExpenseRoute);
app.use("/api/profile", verifyToken, ProfileRoute);


const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
