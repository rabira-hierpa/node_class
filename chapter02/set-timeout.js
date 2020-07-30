let count = 0;
setInterval(() => console.log(`${++count} addis `), 1000);

setTimeout(() => {
	console.log('Hello from the present ' + Date.parse('yy-mm-dd'));
	process.exit();
}, 5500);
