var connection = require('./../js/configBD');

module.exports.addingPlaceHuntObl = function ( req, res) {
    var oblastHunt = {
        "opName": req.body.opName,
        "opAdress": req.body.opAdress,
        "opSize": req.body.opSize,
        "opOblast": req.body.opOblast
    };
    console.log(req.body);

    connection.query('INSERT INTO fishingandhunting.oblastpolyvannja SET ?', oblastHunt, function (error, result, fields) {
        if (error) {
            res.json({
                status: false,
                message:'there are some error with query adding fish insert'
            })
        }else {
            // res.sendFile(path.join(__dirname,'../','Success.html'));
            res.redirect('http://localhost:3000/Contacts.html');
        }
    });
};