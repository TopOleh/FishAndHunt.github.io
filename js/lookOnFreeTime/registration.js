var Cryptr     = require('cryptr');
var connection = require('../configBD');
var cryptr     = new Cryptr('myTotalySecretKey');
var path       = require ('path');

function registration(req,res){
    var encryptedString = cryptr.encrypt(req.body.uPassword);
    var users={
        "uFullName": req.body.uFullName,
        "uEmail": req.body.uEmail,
        "uPassword": encryptedString,
        "uGender": req.body.uGender,
        "uHobby": req.body.uHobby
    };
    console.log(req.body);
    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
        }else {
            res.sendFile(path.join(__dirname,'../','Success.html'));
        }
    });
};
document.getElementById('registered').onclick = registration();