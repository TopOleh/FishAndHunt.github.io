var Cryptr     = require('cryptr');
var connection = require('./../js/configBD');
var cryptr     = new Cryptr('myTotalySecretKey');
var path       = require ('path');



module.exports.register=function(req,res){
    var encryptedString = cryptr.encrypt(req.body.uPassword);
    var uEmail = req.body.uEmail;
    var uFullName = req.body.uFullName;

    var users={
        "uFullName": req.body.uFullName,
        "uEmail": req.body.uEmail,
        "uPassword": encryptedString,
        "uGender": req.body.uGender,
        "uHobby": req.body.uHobby
    };
    console.log(req.body);
    connection.query('SELECT * FROM users WHERE uEmail = ? or uFullName = ?', [uEmail, uFullName], function (error, result, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'Something wrong with query validation user'
            });
        }else if (result.length > 0){
            if (result[0].uEmail===uEmail){
                res.json({
                    status: false,
                    message: 'User with this email is already exist',
                });
            }
            if (result[0].uFullName === uFullName){
                res.json({
                    status: false,
                    message: 'User with this name is already exist',
                });
            }
        }
    });
    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
        }else {
            // res.sendFile(path.join(__dirname,'../','Success.html'));
            res.redirect('http://localhost:3000/index.html');
        }
    });
};
