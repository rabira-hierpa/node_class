const fs = require('fs');

const path = '.';

fs.readdir(path, (err, fileList) => {
	if (err) return console.error(err);
	console.log(fileList);
});
