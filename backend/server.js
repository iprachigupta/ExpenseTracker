const express = require("express");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");
const AuthRouter = require("./routes/AuthRoute");
const cookieParser = require("cookie-parser");
const ProtectedRoute = require("./routes/ProtectedRoute")
const verifyToken = require("./middlewares/VerifyToken")
const ExpenseRoutes = require("./routes/ExpenseRoute");


const corsOptions = {
  origin: 'http://localhost:5173',  // Allow your frontend's origin
  credentials: true,  // Allow cookies and credentials to be sent
};

//models
require("dotenv").config();
require("./models/db");

//middlewares
app.use(cors(corsOptions));
app.use(body_parser.json()); //can use app.use(express.json()) instead of body parser
app.use(cookieParser());


app.use("/auth", AuthRouter)
app.use("/dashboard", ProtectedRoute)
app.use('/api/expenses', verifyToken, ExpenseRoutes);

const userRoutes = require("./routes/user");
app.use("/api", userRoutes);


app.get("/", (req, res)=>{
    res.send("Hello Server !")
})


//port
const PORT = 8080 || process.env.PORT;

app.listen(PORT , ()=>{
    console.log(`Server running at ${PORT}`);
})