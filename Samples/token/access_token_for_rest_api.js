const apiKeySid = 'SKreuW010Lx0inKPfuTJ7lu1rHJ44k5xG';
const apiKeySecret = 'MVZyeGtLeGhVbEtwWGNmOUtSeHBDVTQxQzc1Mk83SA==';

var token = getAccessToken();
console.log(token);


function getAccessToken() {
	var now = Math.floor(Date.now() / 1000);
	var exp = now + 3600;

	var header = {cty: "stringee-api;v=1"};
	var payload = {
		jti: apiKeySid + "-" + now,
		iss: apiKeySid,
		exp: exp,
		rest_api: true
	};

	var jwt = require('jsonwebtoken');
	var token = jwt.sign(payload, apiKeySecret, {algorithm: 'HS256', header: header})
	return token;
}
