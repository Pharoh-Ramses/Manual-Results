requestAnimationFrame("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRoutes = require("./routes/auth");

const app = express();

app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials: true,
}));

app.use("/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));