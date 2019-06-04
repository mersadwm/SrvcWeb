const router = require('express').Router();
const passport = require('passport');


//auth with google
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/logout',(req,res)=>{
    //hande with passport
    res.send('logout')
});

module.exports = router;