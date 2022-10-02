const Posts = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friends');

module.exports.home = async function(req, res){
    // populate the user of each post along with other models
    // first this will get executed

    try{
        let posts = await Posts.find({})
        .sort('-createdAt')
        .populate('user')
        // to get comments and user for that comment
        .populate({
            path: 'comments', 
            // further populate after comments with user
            populate: {
                path: 'user'
            }, 
            populate: {
                path: 'likes'
            }
        }).populate('likes');
        
        // then this second
        let users = await User.find({});
    
        // if req is authenticated that means users has signed in then show user friends
        if(req.isAuthenticated()){
            const friendDetails = {};
            const userId = req.user._id;
            const user = await User.findOne({_id: userId}); 
            // to get id's of all the friends of the user  
            const friends = user.friends;
            for(let f_id of friends){
                const friend = await User.findById(f_id);
                friendDetails[friend.name] = friend.email;
            }  
            return res.render('home', {
                title: 'Codeial | Home', 
                all_users: users, 
                posts: posts, 
                friendDetails: friendDetails
            });
        }
        
        // after the second third one
        return res.render('home', {
            title: 'Codeial | Home', 
            all_users: users, 
            posts: posts
        });
    }

    catch(err){
        console.log('Error', err);
        return;
    }
}


//modules.exports.actionName = function(req, res){}
