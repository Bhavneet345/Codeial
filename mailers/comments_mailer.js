const nodemailer = require('../config/nodemailer');


// another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from: 'codeial.com', 
        to: comment.user.email, 
        subject: "New comment Published!", 
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log("error in sending email", err);
            return;
        }
        console.log("mail delivered");
    });
}
