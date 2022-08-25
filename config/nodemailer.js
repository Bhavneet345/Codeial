const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// parts that defines how the emails are going to send
let transporter = nodemailer.createTransport({
    service: 'gmail', 
    host: 'smtp.gmail.com', 
    port: '587', 
    secure: false,
    auth: {
        user: 'singhbhavneet171@gmail.com', 
        pass: 'zleasmxkkvtvhenw'
    }
});

// template in which the email will be sent
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath), 
        data, 
        function(err, template){
            if(err){
                console.log("error in rendering template");
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter, 
    renderTemplate: renderTemplate
}