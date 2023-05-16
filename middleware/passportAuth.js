const admin = require("../models/admin");

const LocalStrategy = require("passport-local").Strategy;
let passportAuth = (passport) => {

    passport.use(new LocalStrategy(
        async (username, password, done) => {
            // console.log(username);
            console.log("username: " + username);
            let user = await admin.findOne({ username: username })
            console.log(user, "user");
            if (!user) {
                return done(null, false)
            }
            if (user.password != password) {
                return done(null, false)
            }
            return done(null, user)
        }
    ));
    passport.serializeUser((user, done) => {
        console.log("serialized user", user);
        return done(null, user.id);
    })
    passport.deserializeUser(async (id, done) => {
        let User = await admin.findById(id)
        console.log("deserialized user", User);
        done(null, User);
    });
};

module.exports = passportAuth;