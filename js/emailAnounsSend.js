var nodemailer = require('nodemailer');


module.exports.sendResonse = function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.body.email,
            pass: req.body.password
        }
    });

    var mailOptions = {
        from: req.body.email,
        to: 'dgtop997@gmail.com',
        subject: req.body.subject,
        text: req.body.textArea
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.redirect('https://topoleh.github.io/FishAndHunt.github.io/index.html');
};
