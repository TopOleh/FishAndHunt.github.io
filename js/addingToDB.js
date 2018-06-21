var connection = require('./../js/configBD');


module.exports.addingFishInform = function ( req, res) {
    var fishes = {
        "fiName": req.body.fiName,
        "fiType": req.body.fiType,
        "fiSize": req.body.fiSize,
        "fiFavoriteBait": req.body.fiFavoriteBait
    };

    var animals = {
        "aName": req.body.aName,
        "aType": req.body.aType,
        "aSize": req.body.aSize,
        "aFavoriteBait": req.body.aFavoriteBait,
        "aPicture": req.body.aPicture
    };
    let fish = req.body.fiName;
    let animal = req.body.aName;

    console.log(req.body);
    if(fish){
        connection.query('INSERT INTO fishes SET ?', fishes, function (error, result, fields) {
            console.log("Fish");
            if (error) {
                res.json({
                    status: false,
                    message:'there are some error with query adding fish insert'
                })
            }else {
                // res.sendFile(path.join(__dirname,'../','Success.html'));
                res.redirect('http://localhost:3000/addingInformation.html');
            }
        });
    }else if (animal){
        connection.query('INSERT INTO animals SET ?', animals, function (error, result, fields) {
            console.log("Animal");
            if (error) {
                res.json({
                    status: false,
                    message:'there are some error with query adding animals insert'
                })
            }else {
                // res.sendFile(path.join(__dirname,'../','Success.html'));
                res.redirect('http://localhost:3000/addingInformation.html');
            }
        });
    }
};