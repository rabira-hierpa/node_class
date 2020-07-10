const http = require('http');
const port = process.env.PORT || 1337;
const server = http.createServer(function (req, res) {
	res.end('Hello');
});
server.listen(port);
console.log(`Server listening on port ${port}`);
