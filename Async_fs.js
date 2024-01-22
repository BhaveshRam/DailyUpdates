const { log } = require("console");
const { readFile, writeFile } = require("fs");

console.log("Hello.. it is starting")

readFile("./content/test.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = result;
  writeFile(
    "./content/result.txt",
    `Here is the result of the value : ${first}`,
    (err, result) => {
      if (err){
        console.log(err);
        return 
      }
      console.log("Completed")
    }
  );
});
log("it is ending")