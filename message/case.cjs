"use strict"
//const { MessageMedia } = require('wwebjs');
const toMs = require('ms')
const fs = require("fs")
const fse = require('fs-extra')
const moment = require("moment-timezone")
const util = require("util")
const { exec, spawn } = require( "child_process")
const axios = require( "axios")
const yts = require( "yt-search")
const speed = require( "performance-now")
//const ms = require( "parse-ms")
const ytdl = require( 'ytdl-core')
const os = require( 'os')
const { performance } = require( 'perf_hooks')
//onst fetch = require( 'node-fetch')
const cheerio = require( 'cheerio')
const request = require("request")
const { join, dirname } = require( 'path')
const path  = require( 'path')
const {Socket, smsg} = require ('../lib/simple.cjs')



const thumb = fs.readFileSync('./stik/thumb.jpeg')
const dashboardImg = fs.readFileSync('./stik/dashboard.jpg')
const fearless = fs.readFileSync('./stik/fearless.jpg')
var publik = false

module.exports = async(conn, m)=>{
try{
m = await smsg(conn, m)
const { type,args,sender,ucapanWaktu,botNumber,senderNumber,groupName,groupId,groupMembers,groupDesc,groupOwner,pushname,itsMe,isGroup,mentionByTag,mentionByReply,users,budy,body,numberQuery,id, hasMedia,quotedMsg, timestamp,hasQuotedMsg } = m

  

const {formatp, getRandom,generateProfilePicture, getCase,runtime,FileSize,h2k, makeid,kyun,randomNomor,jsonformat, isUrl, fetchJson,pickRandom,getGroupAdmins, sleep,getBuffer}  = (await import('../lib/myfunc.cjs')) 
const logs = (await import('./logs.js'))
const {default: register} = (await import('./register.js'))

//----------------- LIB FILE ------------------\\  
const {default: _data} = (await import('../lib/totalcmd.js'))
const {default: _sewa} = (await import('../lib/sewa.js'))
const {default: _prem} = (await import('../lib/premium.js'))
const {default: _scrape} = (await import('../lib/scraper.js'))
const {default: _error} = (await import('../lib/totalerror.js'))
const {default: _blockcmd} = (await import('../lib/blockcmd.js'))
const {default: _spam} = (await import('../lib/antispam.js'))
const {default: _ban} = (await import('../lib/banned.js'))
const {TelegraPh} = (await import('../lib/uploader.js'))


  
  



  
//Database
const AntiSpam = db.data.antispam
const DataId = db.data.data
const ban = db.data.banned
const premium = db.data.premium
const listcmdblock = db.data.blockcmd 
const listerror = db.data.listerror
const hitnya = db.data.hittoday
const dash = db.data.dashboard 
const anonChat = db.data.anonymous 
const allcommand = db.data.allcommand 
const sewa = db.data.sewa
const spammer = []


var Ownerin ="6285156137901@s.whatsapp.net"
var ownerNumber = [`${m.author}`,`${nomerOwner}@c.us` ,`${nomerOwner2}@c.us`,`6285156137901@c.us`]




const from = m.chat
const prem = _prem.checkPremiumUser(sender, premium)
const prefix = "."
const isCmd = m.body.startsWith(prefix)
const isCommand = isCmd? m.body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() :""
const q = args.join(' ')
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
const isOwner = ownerNumber.includes(sender) || _data.checkDataId ("owner", sender, DataId) 
const command = (prem || isOwner)? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCommand
const theOwner = sender == Ownerin 
const timestampp = speed();
const latensi = speed() - timestampp
const quoted = m.quotedMsg ? m.quotedMsg : m
//const mime = (quoted.msg || quoted).mimetype || ''
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 
const Input = mentionByTag[0]? mentionByTag[0] : mentionByReply ? mentionByReply : q? numberQuery : false 
const replyCommand = isCmd? isCmd : allcommand.includes(toFirstCase(command))
const user = global.db.data.users[m.sender] 
const settings = global.db.data.settings['settingbot']


//Import message.js
await (await import('./message.js')).default(prefix,command)



//Register terlebih dahulu sebelom pakai bot
register(m,makeid,isCmd,isOwner)




const isImage = (type === 'image')
const isVideo = (type === 'video')
const isSticker = (type == 'sticker')
const isAudio = (type == 'audio')
const isText = (type == 'chat')
const isReaction = (type == 'reaction')
const isMedia = (type === 'image' || type === 'video' || type === 'audio' || type === 'ptt' )
const isViewOnce = (type == 'viewOnce')
const isAllMedia = (type === 'chat' || type === 'video' || type === 'sticker' || type === 'audio' || type === 'contact' || type === 'location')
const isQuotedImage = type === 'chat' && quoted.type == 'image'
const isQuotedVideo = type === 'chat' && quoted.type == 'video'
const isQuotedSticker = type === 'chat' && quoted.type == 'sticker'
const isQuotedAudio = type === 'chat' && quoted.type == 'audio'
const isQuotedTeks = type === 'chat' && quoted.type == 'chat'
const isQuotedViewOnce = quoted.type == 'viewOnce'




//Security / Keamanan
const isBotGroupAdmins = isGroup ? m.isBotAdmin : false
const isGroupOwner = isGroup ? m.isRAdmin : false
const isGroupAdmins = isGroup ? m.isAdmin : false
const isAntiLink = isGroup ? db.data.chats[from].antilink : false
const isAntidelete = isGroup ? db.data.chats[from].antidelete : false
const isKickarea = isGroup ? db.data.chats[from].antiasing : false
const isAntilinkGc = isGroup ? db.data.chats[from].antilinkgc : false
const isBanchat = isGroup ? db.data.chats[from].banchat : false 
const isAntiVirtex = isGroup ? db.data.chats[from].antivirtex : false
const isAntihidetag = isGroup ? db.data.chats[from].antihidetag : false
const isAntiViewOnce = isGroup ? db.data.chats[from].viewonce : false
const isBanned = sender? _ban.check(senderNumber, ban) : false
const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
const gcount = isPremium ? gcounti.prem : gcounti.user
const updateGempa = isGroup ? db.data.chats[from].updateGempa : false


//User 
const userLevel = user? db.data.users[m.sender].level : false
const userExp = user? db.data.users[m.sender].exp : false
const userId = user? db.data.users[m.sender].id : false
const amountExp = Math.floor(Math.random() * 10) + 50
const requiredExp = 1000 * userLevel
const userPersen = userExp/requiredExp*100
const userVerified = user? db.data.users[m.sender].date : false

  
//Bot hanya merespon jika button miliknya saja yang di tekan 
if(m.myButton) {return}


//AUTO Read Message  
//conn.sendSeen(from)

//Presence Online
if (isCmd){
} else {
conn.sendPresenceAvailable()
}




 
//Public & Self And Banchat
if (!publik && !itsMe && !isOwner && !theOwner) {return} 
if (isGroup && !isPremium && isBanchat && !itsMe && !isOwner) {return}
//log(m) 


 
  
//Console log   
if(!isCmd && budy.length < 8000 && itsMe && !isSticker && !isMedia) logs.message(conn,m,budy,AntiSpam) 
if(isCmd) logs.commands(m,command) 











  
  

//SetReply
const setReply = async(result,member = []) =>{ 
conn.sendMessage(m.chat,result);
}


	
const math = (teks) => {
return Math.floor(teks)
}  

  
//onlyOwner
const onlyOwner = async() =>{
setReply(mess.only.ownerB)
}


//Bot tidak bisa di akses di pc kecuali premium
let lowFitur = db.data.lowfeature
if(!isGroup && !isPremium && isCmd && !lowFitur.includes(command)) {
let teks = `Kamu bukan user premium
silahkan upgrade ke premium agar bisa menggunakan 
bot secara private chat, terimakasih

${fake}`
return setReply(teks)
}


































  
const addSpammer = function(jid, _db){
let position = false
Object.keys(_db).forEach((i) => {
if (_db[i].id === jid) {
position = i
}
})
if (position !== false) {
_db[position].spam += 1
 } else {
let bulin = ({ id: jid, spam: 1 })
 _db.push(bulin)     
}
}

const FinisHim = async function(jid, _db){
let position = false
Object.keys(_db).forEach((i) => {
if (_db[i].id === jid) {
position = i
}
})
if (position !== false) {
if(_db[position].spam > 7){
if(db.data.users[sender].banned.status || !isOwner){return}
let obj = {
id: senderNumber,
status: true,
date: calender,
reason: "Spam Bot"
}
db.data.users[woke].banned = obj               
console.log(`${jid} Terdeteksi spam lebih dari ${_db[position].spam} kali`)
setReply("Kamu telah di banned karena telah melakukan spam")
}
} else {
console.log(`Spam ke ${_db[position].spam}`)
}
}

  
//ANTI SPAM BERAKHIR
if(_spam.Expired(senderNumber, "Case", AntiSpam)){
let position = false
for(let i of spammer){
if(i.id == senderNumber){
position = i
}
}
    
if (position !== false) {
spammer.splice(position, 1)
console.log(chalk.bgGreen(color("[  Remove ]", "black")),"Sukses remove spammer")
}
}

_spam.Expired(senderNumber, "NotCase", AntiSpam)
if(isBanned && !isOwner){return} //user terbanned
if(isCmd && _spam.check("Case",senderNumber, AntiSpam)){
addSpammer(senderNumber, spammer)
FinisHim(senderNumber, spammer)
return console.log(chalk.bgYellowBright(chalk.black("[  SPAM  ]")),"antispam Case aktif")
}

//ANTI SPAM PRIVATE CHAT
if(antiSpam && isCmd && _spam.isFiltered(from) && !isGroup && !itsMe && !isOwner){
_spam.add("Case",senderNumber, "15 s", AntiSpam)
addSpammer(senderNumber, spammer)
return setReply("Beri bot waktu jeda 5 detik")
}

//ANTI SPAM GROUP CHAT     
if (antiSpam && isCmd && _spam.isFiltered(from) && isGroup && !itsMe && !isOwner) {
_spam.add("Case",senderNumber, "15s", AntiSpam)
addSpammer(senderNumber, spammer)
return setReply("Beri bot waktu jeda 5 detik")
}
if (isCmd && !isOwner) _spam.addFilter(from)



//System Expired
_sewa.expiredCheck(conn, sewa)
_prem.expiredCheck(conn,premium) 



//Make Sticker
async function makeSticker(media,Sticker, StickerTypes){
let jancok = new Sticker(media, {
pack: packName, // The pack name
author: authorName, // The author name
type: StickerTypes.FULL, // The sticker type
categories: ['🤩', '🎉'], // The sticker category
id: '12345', // The sticker id
quality: 70, // The quality of the output file
background: '#FFFFFF00' // The sticker background color (only for full stickers)
})
let stok = getRandom(".webp")
let nono = await jancok.toFile(stok)
let ss = MessageMedia.fromFilePath(nono);
await conn.sendMessage(ss);
await fs.unlinkSync(stok)
}





//DOWNLOAD MP4
const downloadMp4 = async (Link ) => {
try{
await ytdl.getInfo(Link);
let mp4File = getRandom('.mp4') 
let nana = ytdl(Link)
.pipe(fs.createWriteStream(mp4File))
.on("finish", async () => {    
let ss = MessageMedia.fromFilePath(mp4File);
await conn.sendMessage(ss);
fs.unlinkSync(`./${mp4File}`)
})     
} catch(err) {
setReply(`${err}`)
}
}

//DOWNLOAD MP3
const downloadMp3 = async (Link ) => {
try{
await ytdl.getInfo(Link);
let mp3File = getRandom('.mp3') 
ytdl(Link, {filter: 'audioonly'})
.pipe(fs.createWriteStream(mp3File))
.on("finish", async () => {  
let ss = await MessageMedia.fromFilePath(mp3File);
await conn.sendMessage(ss);
fs.unlinkSync(mp3File)
})       
} catch (err){
console.log(color(err))
}
}
  

switch(command) {

case "sticker":
case "stiker":
case "stc":
case "s": {
if (hasMedia && (type == "image" || type == "video")) {
let media = await m.downloadMedia()
return m.reply(media, from, { sendMediaAsSticker: true, stickerName: "Sticker", stickerAuthor: "@kaguyaShinomiya" })
} else if (quotedMsg && (quotedMsg.type == "image" || quotedMsg.type == "video")) {
let media = await (await m.getQuotedMessage()).downloadMedia()
return m.reply(media, from, { sendMediaAsSticker: true, stickerName: "Sticker", stickerAuthor: "@kaguyaShinomiya" })
} else {
return setReply("Silahkan reply/kirim pesan media dengan caption *#sticker*")
}
}
break 

 
case '=>': {
if (!isOwner) return setReply(mess.only.owner)
try {
let evaled = await eval(q)
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
setReply(evaled)
} catch (err) {
setReply(String(err))
}
}
break

case '$':{
if (!isOwner) return onlyOwner()
await setReply("_Executing..._")
exec(q, async (err, stdout) => {
if (err) return setReply(`${copyright}:~ ${err}`)
if (stdout) {
await setReply(`*>_ Console*\n\n${stdout}`)
}
})
}
break

    
case  'restart':{
if (!isOwner) return //setReply(mess.only.owner)
await setReply(`_Restarting ${fake}_`)
await setReply("_Succes_")
await sleep(1000)
process.send('reset') 
}
break


case 'speed':  
setReply(`Speed: ${latensi.toFixed(4)} Second`)
break    


    

case 'runtime':{
let data = global.db.data.others['runtime']
let time = (new Date - data.runtime) || 'lamanya'
let teks =`
🕦 System aktif selama ${runtime(process.uptime())}
⏰ Bot aktif selama ${clockString(time)}
`
setReply(teks)
}
break



case 'speedtest': {
let cp = require('child_process')
let { promisify } = require('util')
let exec2 = promisify(cp.exec).bind(cp)
await setReply("_Testing Speed..._")
let o
try {
o = await exec2('python speed.py')
} catch (e) {
o = e
} finally {
let { stdout, stderr } = o
if (stdout.trim()) setReply(stdout)
if (stderr.trim()) setReply(stderr)
}
}
break

case 'linkgc':{
if (!isGroup) return setReply(mess.only.group)
if (!isBotGroupAdmins) return reply(mess.Badmin)
let chat = await m.getChat();
let asu = 'https://chat.whatsapp.com/' + await chat.getInviteCode()
setReply(asu)
}
break

    
    
default:  
}




  

  
}catch(err){
console.log(err)
}





  
}




let file = require.resolve(__filename)
fs.watchFile(file, async () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")),chalk.white(`${__filename}`) )
delete require.cache[file]
require(file)
})
