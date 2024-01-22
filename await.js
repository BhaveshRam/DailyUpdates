const { log } = require("console");
const { readFile, writeFile } = require("fs");

const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const start = async ()=>{
    try{
        const first = await getText('./content/test.txt')
        const second = await getText('./content/result.txt')

        log(first,second)
    }
    catch (error){
        log(error)
    }
}

start()
