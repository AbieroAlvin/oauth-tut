const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
          });
          user.save((err) => {
            if (err) return done(err);
            return done(null, user);
          });
        } else {
          return done(null, user);
        }
      });
    }
  )
);

// Serialization/Deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

exports.googleAuth = passport.authenticate("google", { scope: ["profile"] });

exports.googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

exports.protectedRoute = (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.name}`);
  } else {
    res.redirect("/login");
  }
};
