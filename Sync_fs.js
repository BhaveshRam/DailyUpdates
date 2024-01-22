const { log } = require("console");
const { writeFileSync, readFileSync } = require("fs");

log("Starting");

result = readFileSync("./content/test.txt", "utf8")
log(result)
  writeFileSync(
    "./content/result.txt",
    `Here is the Synchronous result: ${result}`,
    { flag: "a" }
  );
log("Finished execution end!");
