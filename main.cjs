"use strict"
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)
const fs = require("fs");
const CFonts = require('cfonts')
const path = require('path')
const axios = require ('axios');

const {Socket, smsg} = require ('./lib/simple.cjs')
//const {Fearless} = require ('./message/case.js')
const qrcode = require('qrcode-terminal')
const port = process.env.PORT || 3000   
const proxy = process.env.http_proxy || 'http://168.63.76.32:3128';
const exec = require('util').promisify(require('child_process').exec);
//const wweb = require('wwebjs')
//const { Client, Location, List, Buttons, LocalAuth } = wweb

//Function untuk menghapus sampah tmp di database
setInterval(() => {
fs.readdir('./database', async function (err, files) {
let tmpFile = await files.filter(item => item.endsWith(".tmp"))
if(tmpFile.length > 0){
console.log("Menghapus file sampah tmp")
await tmpFile.forEach(function (file) {
fs.unlinkSync(`./database/${file}`)
});
console.log("Berhasil menghapus semua sampah tmp")
}
})
}, 10_000)


//Function Auto delete sampah 
setInterval(() => {
let directoryPath = path.join();
fs.readdir(directoryPath, async function (err, files) {
var filteredArray = await files.filter(item =>
item.endsWith("gif") ||
item.endsWith("png") || 
item.endsWith("mp3") ||
item.endsWith("mp4") || 
item.endsWith("jpg") ||
item.endsWith("webp") ||
item.endsWith("webm") ||
item.endsWith("zip") 
)
if(filteredArray.length > 0){
let teks =`Terdeteksi ${filteredArray.length} file sampah`
console.log(teks)
setInterval(() => {
if(filteredArray.length == 0) return console.log("File sampah telah hilang")
filteredArray.forEach(function (file) {
let sampah = fs.existsSync(file)
if(sampah) fs.unlinkSync(file)
})
}, 15_000)
}
});
}, 30_000)



CFonts.say('fearless', {
font: 'chrome',
align: 'left',
gradient: ['red', 'magenta']
})













//Connect to WhatsApp
const connectToWhatsApp = async () => {
(await import('./settings.js'))
const chromiumPath = (await exec("whereis chromium")).stdout.trim().split(":")[1].trim();
const { Client, Location, List, Buttons, LocalAuth } = (await import("wwebjs"))
const {connectionUpdate} = (await import("./message/connection.js"))
const {connect} = (await import("./server.js"))


await (await import("./message/database.js")).default()

//Function untuk update runtime di database
setInterval(() => {
let data = global.db.data.others['runtime']

if(data){ 
if((new Date - data.lastTime) > (60000*60)){
data.runtime = + new Date
data.lastTime = + new Date
console.log("Runtime di perbarui")
} else data.lastTime = + new Date
} else{ global.db.data.others['runtime'] = {
runtime: + new Date,
lastTime: + new Date
}
console.log("New update runtime")
}

},60_000)


//new npm.mywajs.
const conn = new Client({
authStrategy: new LocalAuth({
clientId: 'botwaweb',
dataPath: './session'
}),
playwright: {
viewport: { width: 1080, height: 1920 },
headless: true,
devtools: false,
args: [
'--aggressive-tab-discard',
'--disable-accelerated-2d-canvas',
'--disable-application-cache',
'--disable-cache',
'--disable-dev-shm-usage',
'--disable-gpu',
'--disable-offline-load-stale-cache',
'--disable-setuid-sandbox',
'--disable-setuid-sandbox',
'--disk-cache-size=0',
'--ignore-certificate-errors',
'--no-first-run',
'--no-sandbox',
'--no-zygote',
'--enable-features=WebContentsForceDark:inversion_method/cielab_based/image_behavior/selective/text_lightness_threshold/150/background_lightness_threshold/205'
],
bypassCSP: true,
executablePath:chromiumPath 
},
markOnlineAvailable: true,
qrMaxRetries: 2,
userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
clearSessions: true,
takeoverTimeoutMs: 'Infinity'
})
  


conn.initialize();
await connect(conn,port)
await connectionUpdate(conn)
  


conn.on("message_create", async (m) => {
if (global.db.data) await global.db.write() 
if (!m._data.isNewMsg) return
require('./message/case.cjs')(conn, m)
})



  
const toFirstCase = (str) =>{
let first = str.split(" ")              // Memenggal nama menggunakan spasi
.map(nama => 
nama.charAt(0).toUpperCase() + 
nama.slice(1))                 // Ganti huruf besar kata-kata pertama
.join(" ");

return first
 }


 const Log = (text) =>{
 console.log(text)
 }
  


let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let week = d.toLocaleDateString(locale, { weekday: 'long' })
const calender = d.toLocaleDateString("id", {
day: 'numeric',
month: 'long',
year: 'numeric'
})


function clockString(ms) {
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
let dDisplay = d > 0 ? d +  " hari, ": "";
let hDisplay = h > 0 ? h +  " jam, " : "";
let mDisplay = m > 0 ? m +  " menit, " : "";
let sDisplay = s > 0 ? s +  " detik" : "";
let time = d > 0 ? dDisplay + hDisplay + mDisplay  : hDisplay + mDisplay + sDisplay
return time
}

function tmp(file) {
return file+".tmp"
}



global.tmp = tmp
global.clockString = clockString
global.week = week
global.calender = calender  
global.Log = Log
global.log = Log
global.toFirstCase = toFirstCase


  }
connectToWhatsApp()