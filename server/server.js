// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

var AuthenticationController = require('./config/authentication'), 
    passportService = require('./config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
// Configuration
mongoose.connect('mongodb://localhost/tournaments', { useMongoClient: true });
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Tournaments
// Models
// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tournament = mongoose.model('tournaments', {
    title: String,
    description: String,
    rating: Number
});
 
// Routes

    // Auth Routes
    
    app.post('/api/register', AuthenticationController.register);
    app.post('/api/login', requireLogin, AuthenticationController.login);

    app.get('/api/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // Get tournaments
    app.get('/api/tournaments', function(req, res) {
 
        console.log("fetching Tournaments");
 
        // use mongoose to get all tournaments in the database
        Tournament.find(function(err, tournaments) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(tournaments); // return all tournaments in JSON format
        });
    });

    // get tournament by id
    app.get('/api/tournaments/:tournament_id', function(req, res) {
        Tournament.find({
            _id : req.params.tournament_id
        }, function(err, tournament) {
            if (err)
                res.send(err)
 
            res.json(tournament);
        });
    });
 
    // create tournaments and send back all tournaments after creation
    app.post('/api/tournaments', function(req, res) {
 
        console.log("creating tournament");
 
        // create a tournament, information comes from request from Ionic
        Tournament.create({
            title : req.body.title,
            description : req.body.description,
            rating: req.body.rating,
            done : false
        }, function(err, tournament) {
            if (err)
                res.send(err);
 
            // get and return all the tournaments after you create another
            Tournament.find(function(err, tournaments) {
                if (err)
                    res.send(err)
                res.json(tournaments);
            });
        });
 
    });

    // update a tournament
    app.post('/api/tournaments/:tournament_id',  function(req, res) {
        // console.log(req.body);
        Tournament.updateOne({
            _id : req.params.tournament_id,
            
        }, 
        {
            title : req.body.title,
            description : req.body.description,
            rating: req.body.rating,
            done : false
        },
        function(err, tournament) {
            if (err){
                res.send(err)
            }
            // get and return all the tournaments after update
            Tournament.find(function(err, tournaments) {
                if (err)
                    res.send(err)
                res.json(tournaments);
            });
        });
    });
 
    // delete a tournament
    app.delete('/api/tournaments/:tournament_id', function(req, res) {
        Tournament.remove({
            _id : req.params.tournament_id
        }, function(err, tournament) {
 
        });
    });


// Teams
// Models
// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Team = mongoose.model('teams', {
    title: String,
    coach: String,
    favourite: Boolean
});
 
// Routes
 
    // Get Teams
    app.get('/api/teams', function(req, res) {
 
        console.log("fetching Teams");
 
        // use mongoose to get all Teams in the database
        Team.find(function(err, teams) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(teams); // return all Teams in JSON format
        });
    });

    // get team by id
    app.get('/api/teams/:team_id', function(req, res) {
        Team.find({
            _id : req.params.team_id
        }, function(err, team) {
            if (err)
                res.send(err)
 
            res.json(team);
        });
    });
 
    // create Team and send back all Teams after creation
    app.post('/api/teams', function(req, res) {
 
        console.log("creating team");
 
        // create a team, information comes from request from Ionic
        Team.create({
            title : req.body.title,
            coach : req.body.coach,
            favourite: req.body.favourite,
            done : false
        }, function(err, team) {
            if (err)
                res.send(err);
 
            // get and return all the teams after you create another
            Team.find(function(err, teams) {
                if (err)
                    res.send(err)
                res.json(teams);
            });
        });
 
    });

    // update a Team
    app.post('/api/teams/:team_id',  function(req, res) {
        // console.log(req.body);
        Team.updateOne({
            _id : req.params.team_id,
            
        }, 
        {
            title : req.body.title,
            coach : req.body.coach,
            favourite: req.body.favourite,
            done : false
        },
        function(err, team) {
            if (err){
                res.send(err)
            }
            // get and return all the teams after update
            Team.find(function(err, teams) {
                if (err)
                    res.send(err)
                res.json(teams);
            });
        });
    });
 
    // delete a Team
    app.delete('/api/teams/:team_id', function(req, res) {
        Team.remove({
            _id : req.params.team_id
        }, function(err, team) {
 
        });
    });
 
 
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");