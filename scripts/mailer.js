var nodemailer = require("nodemailer");

var buildDisplayName = process.env.BUILD_DISPLAY_NAME
var gitBranch        = process.env.GIT_BRANCH
var gitCommit        = process.env.GIT_COMMIT
var gitUrl           = process.env.GIT_URLS
var pipelineId       = process.env.PIPELINE_ID
var pipelineStageId  = process.env.PIPELINE_STAGE_ID
var idsJobId         = process.env.IDS_JOB_ID
var taskId           = process.env.TASK_ID
var idsStageName     = process.env.IDS_STAGE_NAME
var senderAddress    = "autobot@equibitgroup.com"
var senderPassword   = process.env.EMAIL_PWD
var recipientAddress = process.env.RECIPIENT_ADDRESS
var idsProjectName   = process.env.IDS_PROJECT_NAME
var buildStatus      = process.env.BUILD_STATUS
var ibmUrl           = "https://console.bluemix.net/devops/pipelines/"

//console.log(process.env)

// create reusable transport method (opens pool of SMTP connections)
// var smtpTransport = nodemailer.createTransport("smtps://autobot%40equibitgroup.com:"+encodeURIComponent("" + process.env.EMAIL_PWD + "") + "@smtp.office365.com:587");

var smtpTransport = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 25,     // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
            user: senderAddress,
            pass: senderPassword
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

// setup e-mail data with unicode symbols
var mailOptions = {
    from: senderAddress, // sender address
    to: recipientAddress, // list of receivers
    subject: "[ Build " + buildStatus + "] Build " + buildDisplayName + " on " + idsProjectName + " (" + gitBranch + ")", // Subject line
    html: "<b>Project: </b>" + idsProjectName + "<br /><br /><b>" + idsStageName + ": </b>" + buildDisplayName + "<br /><br /><b>Status: </b>" + buildStatus + "<br /><br /><b>Branch: </b>" + gitBranch + "<br /><br /><b>Commit: </b>"+ gitCommit +"<br/><br /><b>Repository: </b>"+ gitUrl +"<br/><br /><br /><b>For more detailed information, please use this link: </b>" + ibmUrl + pipelineId + "/" + pipelineStageId + "/" + idsJobId + "/" + taskId + "?env_id=ibm:yp:us-south<br /><br /><br />" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent!");
    }

    // if you don't want to use this transport object anymore, uncomment following line
    smtpTransport.close(); // shut down the connection pool, no more messages
});
