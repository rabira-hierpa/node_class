const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 1337;
let textResponse = 0;
// respond with plain text
function respondText(req, res) {
	textResponse += 1;
	console.log(textResponse + '-respondText served at ' + Date.now());
	res.setHeader('Content-Type', 'text/html');
	res.end('<h1>Hello</h1>');
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
// File serving
function respondStatic(req, res) {
	// simple translation of req.url to local dir strutucture
	const filename = `${__dirname}/public${req.url.split('/static')[1]}`;
	// read file from the local dir and send it to the browser
	// createReadStream ==> creates a Stream object for the given filename
	// on() ==> listens for error
	// pipe() ==> connects to the response object
	fs.createReadStream(filename)
		.on('error', () => respondNotFound(req, res))
		.pipe(res);
}
// Dynamic serving
const server = http.createServer(function (req, res) {
	if (req.url === '/') return respondText(req, res);
	if (req.url === '/json') return respondJSON(req, res);
	if (req.url.match(/^\/echo/)) return respondEcho(req, res);
	if (req.url.match(/^\/static/)) return respondStatic(req, res);
	respondNotFound(req, res);
});

server.listen(port);
console.log(`Server listening on port ${port}`);
