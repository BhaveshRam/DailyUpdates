const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('response', () => {
    console.log("Hello world")
})
customEmitter.on('Hwllo', (name, roll)=>{
    console.log(`This is Hwllo: ${name}, ${roll}`)
})

customEmitter.emit('response')
customEmitter.emit('Hwllo', 'ram', 25)