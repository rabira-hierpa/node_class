const seconds = [5, 2];
seconds.forEach((sec) => {
	setTimeout(() => console.log(`Waited ${sec} seconds`), 1000 * sec);
});
console.log('done');
