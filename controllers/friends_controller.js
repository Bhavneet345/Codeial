const User = require('../models/user');
const Friendship = require('../models/friends');

module.exports.addRemoveFriend = async function(req, res){
    // path- friends/addRemovefriend/?id=12CE3
    try{
        let added = true;
        const user = await User.findById(req.user._id);
        const friend = await User.findById(req.query.id);
                
        let existingFriends = await Friendship.findOne({
            from_user: req.user._id, 
            to_user: req.query.id
        });
        
        if(existingFriends){
            user.friends.pull(existingFriends.to_user._id);
            user.save();
            friend.friends.pull(existingFriends.from_user._id);
            friend.save();
            existingFriends.remove();
            added = false;
        }
        
        else{
            let newFriendShip = await Friendship.create({
                from_user: req.user._id, 
                to_user: req.query.id
            });
            user.friends.push(newFriendShip.to_user._id);
            user.save();
            friend.friends.push(newFriendShip.from_user._id);
            friend.save();
        }
        return res.status(200).json({
            message: "Request successfull", 
            data:{
                added: added
            }
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}