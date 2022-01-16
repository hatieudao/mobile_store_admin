const passport = require('passport')
    ,LocalStrategy = require('passport-local').Strategy;
const { models } = require('../../models');
// const User = require('../../models/users');
const bcrypt = require('bcrypt');
const userService = require('../../services/admin.user.service');

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
    },
    async function(username, password, done) {
        console.log(username,password);

        try
        {

            const user = await userService.findUnlockAdminUserByUsername(username);
            if (!user) {
                console.log('Sai username');
                return done(null, false, { message: 'Incorrect username.' });
            }
            const match = await validPassword(user,password);
            if (!match) {
                console.log('Sai pass');
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log('user: ',user);
            return done(null, user);
        }
        catch (err){
            done(err);
        }
    }

));

passport.serializeUser(function(user, done) {
    done(null, {id: user.id, username: user.username, full_name: user.full_name, avatar: user.avatar});
});


passport.deserializeUser(async function(user, done) {
    // try
    // {
    //
    //     const user = await models.users.findOne({
    //         where: ({ id: id }),
    //         raw: true
    //     });
    //     console.log('user: ',user);
    //     return done(null, user);
    // }
    // catch (err){
    //     done(err);
    // }
    return done(null, user);
});


// passport.deserializeUser(async function(id, done) {
//     // try
//     // {
//     //
//     //     const user = await models.users.findOne({
//     //         where: ({ id: id }),
//     //         raw: true
//     //     });
//     //     console.log('user: ',user);
//     //     return done(null, user);
//     // }
//     // catch (err){
//     //     done(err);
//     // }
//     return done(null, user);
// });

async function validPassword(user,password){
    return bcrypt.compare(password, user.password);
}

module.exports = passport;

//
// const passport = require('passport')
//     ,LocalStrategy = require('passport-local').Strategy;
// const { models } = require('../../models');
// // const User = require('../../models/users');
//
// passport.use(new LocalStrategy(
//     {
//         usernameField: 'username',
//         passwordField: 'password',
//     },
//     function(username, password, done) {
//         console.log(username,password);
//         ///////// models.users.findOne({username: username}, function (err, user) {
//         User.findOne({where: {username: username}}, function (err, user) {
//             console.log("Tìm thấy user");
//             if (err) {
//                 console.log('Lỗi');
//                 return done(err);
//             }
//             if (!user) {
//                 console.log('Sai username');
//                 return done(null, false, { message: 'Incorrect username.' });
//             }
//             if (!validPassword(password)) {
//                 console.log('Sai pass');
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             console.log('user: ',user);
//             return done(null, user);
//         });
//     }
// ));
//
// function validPassword(user,password){
//     return user.password === password;
// }
//
// module.exports = passport;