var nodemailer = require("nodemailer");

var buildDisplayName = process.env.BUILD_DISPLAY_NAME
var gitBranch        = process.env.GIT_BRANCH
var gitCommit        = process.env.GIT_COMMIT
var pipelineId       = process.env.PIPELINE_ID
var ibmUrl           = "https://console.bluemix.net/devops/pipelines/"
var senderAddress    = "Equibit Builds <equibit.builds@gmail.com>"
var fromAddress     = "hjhutty@gmail.com"

console.log(process.env)

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("smtps://equibit.builds%40gmail.com:"+encodeURIComponent('Canada@2018') + "@smtp.gmail.com:465");

// setup e-mail data with unicode symbols
var mailOptions = {
    from: senderAddress, // sender address
    to: fromAddress, // list of receivers
    subject: "BUILD buildDisplayName (" + gitBranch + "-" + gitCommit + ")", // Subject line
    html: "<b>Build buildDisplayName : PASSED</b><br /><br />BUILD LINK: " + ibmUrl + pipelineId + "?env_id=ibm:yp:us-south<br /><br />Environment: " + console.log(process.env) // html body
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
