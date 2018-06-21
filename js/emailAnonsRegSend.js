var nodemailer = require('nodemailer');
var authenticateController  =   require('./authenticate-controller');

module.exports.sendResonseReg = function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'oleh.topchak@gmail.com',
            pass: 'tato1997'
        }
    });
    console.log(authenticateController.userData());
    var mailOptions = {
        from: 'oleh.topchak@gmail.com',
        to: 'dgtop997@gmail.com',
        subject: req.body.subject,
        text: req.body.textArea + authenticateController.userData()
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.redirect('http://localhost:3000/anonsForRegistered.html');
};
