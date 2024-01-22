const { log } = require("console");
const { readFile, writeFile, read } = require("fs");
const util = require('util')
const readFilePromisify = util.promisify(readFile)
const writeFilePromisify = util.promisify(writeFile)

const start = async ()=>{
    try{
        const first = await readFilePromisify('./content/test.txt', 'utf8')
        const second = await readFilePromisify('./content/result.txt', 'utf8')

        await writeFilePromisify('./content/test-1.txt', `This is second test file : ${first}`)
    }
    catch (error){
        log(error)
    }
}

start()
