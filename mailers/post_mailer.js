const nodemailer = require('../config/nodemailer');


// another way of exporting a method
exports.newPost = (post) => {
    let htmlString = nodemailer.renderTemplate({post: post}, '/posts/new_post.ejs');
    nodemailer.transporter.sendMail({
        from: 'codeial.com', 
        to: post.user.email, 
        subject: "New post Published!", 
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log("error in sending email", err);
            return;
        }
        console.log("mail delivered");
    });
}
