var connection = require('./../js/configBD');
var fs = require('fs');

const arr = [];



module.exports.viewInformOblast=function(req,res){
    var Oblast = req.body.opOblast;
    var animal = req.body.aName;
    var fish   = req.body.fiName;

    console.log(req.body);

    if (Oblast){
        console.log("Oblast");
        connection.query('SELECT * FROM fishingandhunting.oblastpolyvannja WHERE opOblast = ?',[Oblast], function (error, results, fields) {
            if (error) {
                res.json({
                    status:false,
                    message:'there are some error with query oblast'
                })
            }else {
                for (let element = 0; element < results.length; element++) {
                    arr[element] = "<li>"+"Назва : " + results[element].opName
                        + "<br /> Місце : "+ results[element].opAdress
                        + "<br /> Площа : "+ results[element].opSize
                        + "</li>";
                }
                res.send("<ol style=' margin:0px 600px 50px; width: 450px; position:absolute; text-align: center; font-size: 18pt; border: 1px solid black;'>" + arr + "</ol>" +
                    "<footer style='position: fixed; bottom: 0;width: 100%;height: 5%; font-size: 20pt; background-color: antiquewhite; padding-left: 350px'>" +
                    "<a style='padding-right: 350px' href='https://topoleh.github.io/FishAndHunt.github.io/index.html'>Головна</a>" +
                    "<a style='padding-left: 350px' href='https://topoleh.github.io/FishAndHunt.github.io/contactsForUsers.html'>Змінити обасть</a>" +
                    "</footer>");
            }

        });
        console.log("Oblast End");
    }else if(animal || fish) {
        console.log("Animal or fish start");
        if (animal || fish) {
            console.log("Animal");
            console.log(arr);
            connection.query('SELECT * FROM fishingandhunting.animals WHERE aName = ?', [animal], function (error, results, fields) {
                console.log("QueryAnimal")
                if (error) {
                    res.json({
                        status: false,
                        message: 'there are some error with query animals'
                    })
                } else {

                    for (let element = 0; element < results.length; element++) {

                        arr[element] = "<li>" + "Назва : " + results[element].aName
                            + "<br /> Розмір : " + results[element].aSize
                            + "<br /> Впольовано на : " + results[element].aFavoriteBait
                            + "</li>";
                    }
                    if (fish) {
                        console.log(fish);
                        console.log("Fish");
                        console.log(arr);
                        connection.query('SELECT * FROM fishingandhunting.fishes WHERE fiName = ?', [fish], function (error, results, fields) {
                            if (error) {
                                res.json({
                                    status: false,
                                    message: 'there are some error with query fishes'
                                })
                            } else {
                                console.log(arr.length);
                                console.log(results.length);
                                console.log(results);
                                const prevArrLength = arr.length;
                                for (let element = arr.length; element < results.length + prevArrLength; element++) {
                                    arr[element] = "<li>" + "Назва : " + results[element - prevArrLength].fiName
                                        + "<br /> Розмір : " + results[element - prevArrLength].fiSize
                                        + "<br /> Впольовано на : " + results[element - prevArrLength].fiFavoriteBait
                                        + "</li>";
                                }
                                console.log(arr);
                                res.send("<ol style=' margin:0px 600px 50px; width: 450px; position:absolute;text-align: center; font-size: 18pt; border: 1px solid black;'>" + arr + "</ol>" +
                                    "<footer style='position: fixed; bottom: 0;width: 100%;height: 5%; font-size: 20pt; background-color: antiquewhite; padding-left: 350px'>" +
                                    "<a style='padding-right: 350px' href='https://topoleh.github.io/FishAndHunt.github.io/index.html'>Головна</a>" +
                                    "<a style='padding-left: 350px' href='https://topoleh.github.io/FishAndHunt.github.io/fishingForReg'>Змінити трофей</a>" +
                                    "</footer>");
                            }
                            console.log(arr);
                        });
                    }
                    if (!fish) res.send("<ol style=' margin:0px 600px 50px; width: 450px; position:absolute; text-align: center; font-size: 18pt; border: 1px solid black;'>" + arr + "</ol>" +
                        "<footer style='position: fixed; bottom: 0;width: 100%;height: 5%; font-size: 20pt; background-color: antiquewhite; padding-left: 350px'>" +
                        "<a style='padding-right: 350px' href='https://topoleh.github.io/FishAndHunt.github.io/index.html'>Головна</a>" +
                        "<a style='padding-left: 350px' href='https://topoleh.github.io/FishAndHunt.github.io/fishingForReg'>Змінити трофей</a>" +
                        "</footer>");
                }
            });
            console.log(arr);
            console.log("Animal End");
        }
    }
    arr.length = 0;
};