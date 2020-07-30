let count = 0;
setInterval(() => console.log(`${++count} addis `), 1000);

setTimeoutSync(5500);
console.log('Hello from the past');
process.exit();

function setTimeoutSync(ms) {
	const t0 = Date.now();
	while (Date.now() - t0 < ms) {}
}
