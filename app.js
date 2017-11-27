//Project Environment
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var methodOverride = require('method-override');
let app = express();
let router = express.Router();
let request = require('request');
let port = process.env.PORT || 8181;

// Modles
let Camp = require('./app/models/camp');

// Connect MongoDB
// mongoose.connect('mongodb://localhost/camp', {
mongoose.connect('mongodb://modernarm:013871349arm@ds121906.mlab.com:21906/api', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.set("view engine", "ejs");



app.get('/', function (req, res) {
    request('https://armnode-api.herokuapp.com/api/camps', function (error, response, body) {
        let data = JSON.parse(body);
        // console.log(data);
        res.render('campgrounds', {
            camp: data
        });
    });
});

app.get('/campgrounds', function (req, res) {
    request('https://armnode-api.herokuapp.com/api/camps', function (error, response, body) {
        let data = JSON.parse(body);
        // console.log(data);
        res.render('campgrounds', {
            camp: data
        });
    });
});

router.use(function (req, res, next) {
    next();
});

router.get('/', function (req, res) {
    res.json({
        message: 'hooray! welcome to our api! '
    });
});

router.route('/camps')

    .post(function (req, res) {

        let camp = new Camp(); // create a new instance of the Bear model
        let campName = req.body.name; // set the bears name (comes from the request)
        let campImage = req.body.image;
        Camp.create({
            name: campName,
            image: campImage
        }, function (err, camp) {
            if (err) {
                res.status(500).send();
            } else {
                console.log('Camp created');
                res.redirect('/campgrounds');
            }
        });
    })

    .get(function (req, res) {
        Camp.find(function (err, camp) {
            if (err) {
                res.status(500).send();
            } else {
                res.json(camp)
            }
        });
    })
router.route('/camps/:camp_id')
    .get(function (req, res) {
        let campID = req.params.camp_id;
        Camp.findById(campID, function (err, camp) {
            if (err) {
                res.send(err);
            } else {
                res.json(camp);
            }
        });
    })

    .put(function (req, res) {
        let campID = req.params.camp_id;
        let campName = req.body.name;
        let campImage = req.body.image;

        Camp.update({
            _id: campID
        }, {
            $set: {
                name: campName,
                image: campImage
            }
        }, function (err, camp) {
            if (err) {
                res.status(500).send();
            } else {
                console.log('Camp updated');
                res.redirect('/campgrounds');
            }
        });
    })

    .delete(function (req, res) {
        let campID = req.params.camp_id;
        Camp.remove({
            _id: campID
        }, function (err, camp) {
            if (err) {
                res.status(500).send();
            } else {
                console.log('Camp deleted');
                res.redirect('/campgrounds');
            }
        });
    })

app.use('/api', router);

app.listen(port, function () {
    console.log("App started");
});