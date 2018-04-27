var nodemailer = require("nodemailer");

console.log(process.env)

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("smtps://equibit.builds%40gmail.com:"+encodeURIComponent('Canada@2018') + "@smtp.gmail.com:465");

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "IBM Builds <equibit.builds@gmail.com>", // sender address
    to: "hjhutty@gmail.com", // list of receivers
    subject: 'BUILD (process.env.BUILD_DISPLAY_NAME) ( (process.env.GIT_BRANCH) - (process.env.GIT_COMMIT) )', // Subject line
    html: "<b>Build (process.env.BUILD_DISPLAY_NAME) : PASSED</b><br /><br />BUILD LINK: https://console.bluemix.net/devops/pipelines/(process.env.PIPELINE_ID)?env_id=ibm:yp:us-south<br /><br />Environment: (process.env)" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    smtpTransport.close(); // shut down the connection pool, no more messages
});       
