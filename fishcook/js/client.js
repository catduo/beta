var pomelo = window.pomelo;
var username;
var users;
var rid;
var base = 1000;
var increase = 25;
var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var LOGIN_ERROR = "There is no server to log in, please wait.";
var LENGTH_ERROR = "Name/Channel is too long or too short. 20 character max.";
var NAME_ERROR = "Bad character in Name/Channel. Can only have letters, numbers, Chinese characters, and '_'";
var DUPLICATE_ERROR = "Please change your name to login.";

util = {
	urlRE: /https?:\/\/([-\w\.]+)+(:\d+)?(\/([^\s]*(\?\S+)?)?)?/g,
	//  html sanitizer
	toStaticHTML: function(inputHtml) {
		inputHtml = inputHtml.toString();
		return inputHtml.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	},
	//pads n with zeros on the left,
	//digits is minimum length of output
	//zeroPad(3, 5); returns "005"
	//zeroPad(2, 500); returns "500"
	zeroPad: function(digits, n) {
		n = n.toString();
		while(n.length < digits)
		n = '0' + n;
		return n;
	},
	//it is almost 8 o'clock PM here
	//timeString(new Date); returns "19:49"
	timeString: function(date) {
		var minutes = date.getMinutes().toString();
		var hours = date.getHours().toString();
		return this.zeroPad(2, hours) + ":" + this.zeroPad(2, minutes);
	},

	//does the argument only contain whitespace?
	isBlank: function(text) {
		var blank = /^\s*$/;
		return(text.match(blank) !== null);
	}
};

// show error
function showError(content) {
};

// query connector
function queryEntry(url, uid, setRid) {
	var route = 'gate.gateHandler.queryEntry';
	pomelo.init({
		host: url.split(':')[0],
		port: 3014,
		log: true
	}, function() {
		pomelo.request(route, {
			uid: uid
		}, function(data) {
			pomelo.disconnect();
			pomelo.init({
				host: url.split(':')[0],
				port: data.port,
				log: true
			}, function() {
				var route = "db.dbHandler.newGame";
				pomelo.request(route, {
					gameName: "test"
				}, function(data) {
					rid = data.msg.insertId;
					var route = "connector.entryHandler.enter";
					pomelo.request(route, {
						username: username,
						rid: data.msg.insertId.toString()
					}, function(data) {
						u.getUnity().SendMessage("JoviosObject", "JoinNodeLinux", rid.toString());
					});
				});
			});
		});
	});
};

function nodeLinux(url, userID, setRid){
	//wait message from the server.
	pomelo.on('onChat', function(data) {
		u.getUnity().SendMessage("JoviosObject", "OnChat", data.msg.toString());
	});

	//update user list
	pomelo.on('onAdd', function(data) {
		u.getUnity().SendMessage("JoviosObject", "OnAdd", data.user.toString());
	});

	//update user list
	pomelo.on('onLeave', function(data) {
		u.getUnity().SendMessage("JoviosObject", "OnLeave", data.user.toString());
	});


	//handle disconect message, occours when the client is disconnect with servers
	pomelo.on('disconnect', function(reason) {
		
	});
	username = userID;
	queryEntry(url, username, setRid);
};

function sendNodeLinux(content, target, from){
	var route = "chat.chatHandler.send";
	pomelo.request(route, {
		rid: rid,
		content: content,
		from: from,
		target: target
	}, function(data){

	});
};
function loginEmail(email, pass){
	var route = "db.dbHandler.emailLogin";
	pomelo.request(route, {
		email: email,
		pass: pass
	}, function(data){
		u.getUnity().SendMessage("JoviosObject", "OnUserInfo", data[0].JoviosID);
	});
};
function registerEmail(email, pass){
	var route = "db.dbHandler.emailRegister";
	pomelo.request(route, {
		email: email,
		pass: pass
	}, function(data){
		u.getUnity().SendMessage("JoviosObject", "OnUserInfo", data.insertId);
	});
};