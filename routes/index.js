
/*
 * GET home page.
 */

var config = require("../config");
var mailCfg = config.mail;
var receiver;
var mandrill = require('node-mandrill')(config.mandrill);

try {
	receiver = JSON.parse(config.receiver);	
} catch(e) {
	receiver = "";
}

var userDB = require("../schemaDB");

var sendMail = function (to, subject, message) {

	//send an e-mail to jim rubenstein
	mandrill('/messages/send', {
	    message: {
	        to: to,
	        from_email: "nodejs@arecord.us",
	        subject: subject, // Subject line
	        text: message
	    }
	}, function(error, response)
	{
	    //uh oh, there was an error
	    if (error) console.log( JSON.stringify(error) );

	    //everything's good, lets see what mandrill said
	    else console.log(response);
	});
};

var saveUser = function (request) {
	var user = new userDB({ 
		name: request.name,  
		email: request.email,
		message: request.message
	});

	user.save(function (err) {
	  if (err) return handleError(err);
	  // saved!
	  console.log("save data success");
	});
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.requestPost = function(req, res) {
	var request = {
		name: req.body.name || "",
		email: req.body.email || "",
		message: req.body.message || ""
	};

	// response to client
	// res.send(request);

	if (request.email == "") {
		return res.send("Eamil Error, link back to http://arecord.us");
	}

	res.redirect("http://arecord.us");

	//res.send("POST success");

	var message = request.email + "<br/>" + request.name + "<br/>" + request.message;
	var subject = "[Arecord.us]" + request.email + "send a request";

	sendMail(receiver, subject, message);
	saveUser(request);

};