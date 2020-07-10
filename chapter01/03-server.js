const http = require('http');
const qureystring = require('querystring');
const port = process.env.PORT || 1337;

// respond with text
function respondText(req, res) {
	console.log('1-respondText served at ' + Date.now());
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello');
}
// respond with JSON
function respondJSON(req, res) {
	console.log('1-respondJSON served at ' + Date.now());
	res.setHeader('Content-Type', 'appliction/json');
	res.end(JSON.stringify({ text: 'Hello', numbers: [1, 2, 3] }));
}
// respond not found (404)
function respondNotFound(req, res) {
	console.log('404 response served at ' + Date.now());
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('Not Found');
}

// respons for echo url
function respondEcho(req, res) {
	const { input = '' } = qureystring.parse(
		req.url.split('?').slice(1).join('')
	);

	res.setHeader('Content-Type', 'application/json');
	res.end(
		JSON.stringify({
			normal: input,
			shouty: input.toUpperCase(),
			charachterCount: input.length,
			backwards: input.split('').reverse().join(''),
		})
	);
	console.log('Echo response served at ' + Date.now());
}

const server = http.createServer(function (req, res) {
	if (req.url === '/') return respondText(req, res);
	if (req.url === '/json') return respondJSON(req, res);
	if (req.url.match(/^\/echo/)) return respondEcho(req, res);
	respondNotFound(req, res);
});

server.listen(port);
console.log(`Server listening on port ${port}`);
