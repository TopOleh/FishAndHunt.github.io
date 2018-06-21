var express     = require("express");
var bodyParser  = require('body-parser');
var app = express();

var authenticateController  =   require('./authenticate-controller');
var registerController      =   require('./register-controller');
var addingInformationToDB   =   require('./addingToDB');
var addHuntPlaceObl         =   require('./addHuntPlaceObl');
var viewInformationOblast   =   require('./getInformOblast');
var sendAnouns              =   require('./emailAnounsSend');
var sendAnounsReg           =   require('./emailAnonsRegSend');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});


//GET METHODS


app.get('/addingInformation.html', function (req, res) {                            //get from page, adding Information
    res.sendFile("E:/WebShtorm/PllugTask/NodeJSStud/app/addingInformation.html");
});

app.get('/register.html', function (req, res) {                                     //get from page, registration
    res.sendFile("E:/WebShtorm/PllugTask/NodeJSStud/app/register.html" );
});

app.get('/login.html', function (req, res) {                                        //get from page, login
    res.sendFile( "E:/WebShtorm/PllugTask/NodeJSStud/app/login.html");
});
app.get('/Contacts.html', function (req, res) {                                     //get from page, adding contacts
    res.sendFile( "E:/WebShtorm/PllugTask/NodeJSStud/app/Contacts.html");
});
app.get('/contactsForUsers.html', function (req, res) {                             //get from page, get inform about place
    res.sendFile( "E:/WebShtorm/PllugTask/NodeJSStud/app/contactsForUsers.html");
});
app.get('/Anouns.html', function (req, res) {                                       //get from page, send anon with email and password
    res.sendFile( "E:/WebShtorm/PllugTask/NodeJSStud/app/Anouns.html");
});
app.get('/anonsForRegistered.html', function (req, res) {                           //get from page, send anon from registered
    res.sendFile( "E:/WebShtorm/PllugTask/NodeJSStud/app/anonsForRegistered.html");
});


//      POST METHODS


app.post('/js/register-controller', registerController.register);               //registration
app.post('/js/authenticate-controller', authenticateController.authenticate);   //login

//adding information into database
app.post('/js/addingToDB', addingInformationToDB.addingFishInform);              //adding fish
// app.post('/js/addingToDB', addingInformationToDB.addingAnimalInform);            //adding animal
app.post('/js/addHuntPlaceObl', addHuntPlaceObl.addingPlaceHuntObl);             //adding hunt/fish places

app.post('/js/getInformOblast', viewInformationOblast.viewInformOblast);         //show inform about places

app.post('/js/emailAnounsSend', sendAnouns.sendResonse);                         //send email from usual user
app.post('/js/emailAnonsRegSend', sendAnounsReg.sendResonseReg);                 //send email from registered user

app.use('/api', router);
app.listen(3005);