const logger = (req, res, next) =>{
    const url = req.url
    const method = req.method
    const time = new Date().getFullYear()
    console.log(url,method,time);
    next()
}
const authorize= (req, res,next) =>{
    console.log('Authorize')
    next()
}
module.exports = {logger, authorize}