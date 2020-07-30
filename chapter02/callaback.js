const fiftySec = 5000;
const tenYears = 10 * 360 * 24 * 60 * 1000;
setTimeout(() => console.log('Hello from the past'), tenYears);
console.log('Hello from the present');
