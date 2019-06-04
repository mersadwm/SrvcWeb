const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID : '279862265685-c7qqd59k6j493vvbve3jkc7qbp9puujn.apps.googleusercontent.com',
        clientSecret : 'UsfdAK9yDy9RroyMcP2YGVQZ'
    //options for google strategy
},()=>{ 
//pasport callback function
})
)