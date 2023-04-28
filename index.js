import { createRequire } from 'module'
import moment from "moment-timezone"
import cluster from'cluster'
import { join, dirname } from 'path'
import fs from'fs'
import { createServer } from "http"
import { Server } from "socket.io"
import Readline from 'readline'
import yargs from 'yargs/yargs'
const rl = Readline.createInterface(process.stdin, process.stdout)

import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the ability to create the 'require' method

var isRunning = false
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
if (isRunning) return
isRunning = true
let args = [join(__dirname, file), ...process.argv.slice(2)]
/*  CFonts.say([process.argv[0], ...args].join(' '), {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
})*/
cluster.setupMaster({
exec: join(__dirname, file),
args: args.slice(1),
})
let p = cluster.fork()
p.on('message', data => {
console.log('[RECEIVED]', data)
switch (data) {
case 'reset':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'null':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'uptime':
p.send(process.uptime())
break
}
})
p.on('exit', (_, code) => {
if(code == null) process.exit()
isRunning = false
console.error('Exited with code:', code)

if (code === 0) return
fs.watchFile(args[0], () => {
fs.unwatchFile(args[0])
start(file)
})
})
let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
if (!opts['test'])
if (!rl.listenerCount()) rl.on('line', line => {
p.emit('message', line.trim())
})
// console.log(p)
}

start('main.cjs')


