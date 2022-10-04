const { use } = require('passport');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log("error in finding the user");
            return res.redirect('back');
        }
        return res.render('user', {
            title: "Codeial",
            profile_user: user
        });
    });
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            // for the upload avatar and used multer to access form data due to multi part form
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('*******Multer Error: ', err);
                }
                // storing file alongside the user
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // overwritng the existing avatar if uploaded again 
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', 'details updated successfully!');
                return res.redirect('back');
            });
        }
        catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');  
    }
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signup', {
        title: 'Codeial | Sign Up'
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signin', {
        title: 'Codeial | Sign In'
    });
}

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        // console.log('err');
        req.flash("error", "password doesnot match");
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding the user and signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err){
                if(err){
                    // console.log("error in creating the user");
                    req.flash("error", err);
                    return;
                }
                req.flash("success", "Sign Up successfull");
                return res.redirect('/users/sign-in');
            })
        }
        else{
            // console.log('err');
            req.flash("error", err);
            return res.redirect('back');
        }
    });
}

// get the sign in data
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            return;
        }
    });
    req.flash('success', 'Logged out Successfully');
    return res.redirect('/');
}