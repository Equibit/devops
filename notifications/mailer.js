var nodemailer = require("nodemailer");

console.log(process.env)

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("smtps://equibit.builds%40gmail.com:"+encodeURIComponent('Canada@2018') + "@smtp.gmail.com:465");

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "IBM Builds <equibit.builds@gmail.com>", // sender address
    to: "hjhutty@gmail.com", // list of receivers
    subject: "Hello Builds", // Subject line
    text: "Hello from IBM Cloud", // plaintext body
    html: "<b>Hello from IBM Cloud</b>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});       
