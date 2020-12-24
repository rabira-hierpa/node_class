let count = 0;
setInterval(() => console.log(`${++count} addis `), 1000);

setTimeout(() => {
	console.log('Hello from the present ' + Date.parse('YY-MM-DD'));
	process.exit();
}, 5500);
