const os = require('bare-os')

console.log('I am a single executable!')
console.log('Here I use a native module to print your home folder:', os.homedir())
