var Cryptr  = require('cryptr');
cryptr      = new Cryptr('myTotalySecretKey');

var connection = require('./../js/configBD');

module.exports.authenticate=function(req,res){
    var uEmail=req.body.uEmail;
    var uPassword=req.body.uPassword;

    console.log(req.body);

    connection.query('SELECT * FROM fishingandhunting.users WHERE uEmail = ?',[uEmail], function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
        }else{
            if(results.length >0){
                decryptedString = cryptr.decrypt(results[0].uPassword);
                if(uPassword==decryptedString){
                    if(uEmail==='dgtop997@gmail.com') {
                        res.redirect('https://topoleh.github.io/FishAndHunt.github.io/Contacts.html');
                    }else {
                        let userInfo = "\n \n \n" + "Name: " + results[0].uFullName + "\n Email: " + results[0].uEmail;

                        exports.userData = function(){
                            return userInfo;
                        };
                        // res.sendFile(path.join(__dirname, '../',  'authorozatedSuccess.html'));
                        res.redirect('https://topoleh.github.io/FishAndHunt.github.io/anonsForRegistered.html')
                    }
                }else{
                    res.json({
                        status:false,
                        message:"Email and password does not match"
                    });
                }

            }
            else{
                console.log(results);
                res.json({
                    status:false,
                    message:"Email does not exits"
                });
            }
        }
    });
};