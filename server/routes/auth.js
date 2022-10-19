const router = require('express').Router();
const passport = require('passport');

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
        });
    } else {
        res.status(403).json({error:true,message:"Not Authroized"});
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error:true,
        message: "User failed to authenticate.",
        });
});

router.get(
    "/google/callback",
    passport.authenticate("google", { 
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed" }),
)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;