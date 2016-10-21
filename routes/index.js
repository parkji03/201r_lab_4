var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('weather.html', { root:  'public' });
});

router.get('/getcity',function(req,res,next) {
	console.log("In getcity route");

	fs.readFile(__dirname + '/cities.dat.txt', function(err,data) {
		if(err) throw err;
		
		var myRe = new RegExp("^" + req.query.q);
		
		
		var cities = data.toString().split("\n");
		var jsonresult = [];
		for(var i = 0; i < cities.length; i++) {
			var result = cities[i].search(myRe); 
			if(result != -1) {

				jsonresult.push({city:cities[i]});
			} 
		}   
		console.log(jsonresult);
		res.status(200).json(jsonresult);
	});
});

var word = "https://owlbot.info/api/v1/dictionary/";
router.get('/getword',function(req,res) {
	var value = word + req.query.q + "?format=json";
	console.log("In getword");
	console.log(value);
	request(value).pipe(res);
});

module.exports = router;
