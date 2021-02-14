const  BnetStrategy = require('passport-bnet').Strategy;
var BNET_ID = "4975e15f885f44bb82093b4a8f225ce8"	
var BNET_SECRET = "LKk3a8gnGmnD6ky0pUZE9Xtyx6NS3XMY"	

 
// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    callbackURL: "https://localhost:3000",
    region: "eu"
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

app.get('/auth/bnet',
    passport.authenticate('bnet'));
 
app.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        res.redirect('/');
    });