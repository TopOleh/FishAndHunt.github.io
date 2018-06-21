///- REQUIRE FN
// equivalent to require from node.js
function require(url){
    if (url.toLowerCase().substr(-3)!=='.js') url+='.js'; // to allow loading without js suffix;
    if (!require.cache) require.cache=[]; //init cache
    var exports=require.cache[url]; //get from cache
    if (!exports) { //not cached
        try {
            exports={};
            var X=new XMLHttpRequest();
            X.open("GET", url, 0); // sync
            X.send();
            if (X.status && X.status !== 200)  throw new Error(X.statusText);
            var source = X.responseText;
            // fix (if saved form for Chrome Dev Tools)
            if (source.substr(0,10)==="(function("){
                var moduleStart = source.indexOf('{');
                var moduleEnd = source.lastIndexOf('})');
                var CDTcomment = source.indexOf('//@ ');
                if (CDTcomment>-1 && CDTcomment<moduleStart+6) moduleStart = source.indexOf('\n',CDTcomment);
                source = source.slice(moduleStart+1,moduleEnd-1);
            }
            // fix, add comment to show source on Chrome Dev Tools
            source="//@ sourceURL="+window.location.origin+url+"\n" + source;
            //------
            var module = { id: url, uri: url, exports:exports }; //according to node.js modules
            var anonFn = new Function("require", "exports", "module", source); //create a Fn with module code, and 3 params: require, exports & module
            anonFn(require, exports, module); // call the Fn, Execute the module
            require.cache[url]  = exports = module.exports; //cache obj exported by module
        } catch (err) {
            throw new Error("Error loading module "+url+": "+err);
        }
    }
    return exports; //require returns object exported by module
}


var connection = require('../configBD');
var Cryptr  = require('cryptr');
cryptr      = new Cryptr('myTotalySecretKey');

var path    = require('path');

function login(req,res){
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

            if(results.length > 0){
                decryptedString = cryptr.decrypt(results[0].uPassword);
                if(uPassword==decryptedString){
                    if(uEmail==='dgtop997@gmail.com'){
                        res.sendFile(path.join(__dirname,'../','addingInformation.html'));
                    }else
                        res.sendFile(path.join(__dirname,'../','Success.html'));
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
module.exports = login();
document.getElementById('Submit').onclick = login();