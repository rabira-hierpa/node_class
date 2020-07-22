const fs = require('fs');
const express = require('express');
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
	// res.setHeader('Content-Type', 'appliction/json');
	// res.end(JSON.stringify({ text: 'Hello', numbers: [1, 2, 3] })); # core http module
	res.json({ text: 'Hello', numbers: [13, 45, 14], functions: 'express()' });
}
// respond not found (404)
function respondNotFound(req, res) {
	console.log('404 response served at ' + Date.now());
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('Not Found');
}
// respons for echo url
function respondEcho(req, res) {
	// core http()
	// const { input = '' } = qureystring.parse(
	// 	req.url.split('?').slice(1).join('')
	// );
	// res.setHeader('Content-Type', 'application/json');
	// res.end(
	// 	JSON.stringify({
	// 		normal: input,
	// 		shouty: input.toUpperCase(),
	// 		charachterCount: input.length + ' characters',
	// 		backwards: input.split('').reverse().join(''),
	// 	})
	// );
	// express()
	const { input = '' } = req.query;
	res.json({
		normal: input,
		shouty: input.toUpperCase(),
		charachterCount: input.length,
		backwards: input.split('').reverse().join(''),
	});

	console.log('Echo response served at ' + Date.now());
}
// File serving
function respondStatic(req, res) {
	// simple translation of req.url to local dir strutucture
	// const filename = `${__dirname}/public${req.url.split('/static')[1]}`; // #core http()
	// read file from the local dir and send it to the browser
	// createReadStream ==> creates a Stream object for the given filename
	// on() ==> listens for error
	// pipe() ==> connects to the response object
	const filename = `${__dirname}/public/${req.params[0]}`;
	fs.createReadStream(filename)
		.on('error', () => respondNotFound(req, res))
		.pipe(res);
}
// Dynamic serving
const app = express();

app.get('/', respondText);
app.get('/json', respondJSON);
app.get('/echo', respondEcho);
app.get('/static/*', respondStatic);
app.listen(port, () => console.log(`Sever running on port ${port}`));
