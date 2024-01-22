const { log } = require("console");

log("First  task");
setTimeout(() => log("First timeout task"), 2);
setTimeout(() => log("Second timeout task"), 0);
log("Second Task");
