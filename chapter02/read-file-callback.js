const fs = require('fs');

const filename = 'read-file-callback-erro.js';

fs.readFile(filename, (err, fileData) => {
	// Return if file can't open
	if (err) return console.error(err);
	console.log(`${filename}: ${fileData.length}`);
});
