import util from 'util'
import moment from "moment-timezone"
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
import fs from "fs"
import { getBuffer, sleep, getRandom} from "../lib/myfunc.js"
import chalk from 'chalk'
import _prem from "../lib/premium.js"

export const antiCall = async(db,node,conn) => {
const { from, id, status } = node[0]
  
//console.log(json)
const prefix = "."
const thumb = fs.readFileSync('./stik/thumb.jpeg')
const botNumber = conn.user.id ? conn.user.id.split(":")[0]+"@s.whatsapp.net" : conn.user.id
const ban = db.data.banned
const callerId = from
const sender = from
const { virtex8 } = await import('./virtex.js')
//bug kontak
const lep = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(callerId ? { remoteJid: "@s.whatsapp.net" } : {}) 
},
"message": {
"contactMessage": {
"displayName": "WhatsApp Support",
"vcard": "BEGIN:VCARD\nVERSION:3.0\nN:Support;WhatsApp;;;\nFN:WhatsApp Support\nORG:WhatsApp Support\nTITLE:\nitem1.TEL;waid=6288226703423:+62 882-2670-3423\nitem1.X-ABLabel:Ponsel\nX-WA-BIZ-NAME:WhatsApp Support\nEND:VCARD"
}}}
  
if (status == 'offer') {
const ownerNumber = [`${nomerOwner}@s.whatsapp.net` ,`${nomerOwner2}@s.whatsapp.net`,`6285156137902@s.whatsapp.net`,`${conn.user.jid}`]
const premium = db.data.premium
const isOwner = ownerNumber.includes(sender) 
const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)



  
//Panggilan di tolak
const rejectCall = {
tag: 'call',
attrs: {
from: conn.user.id,
to: from,
id: conn.generateMessageTag(),
},
content: [
{
tag: 'reject',
attrs: {
'call-id': id,
'call-creator': from,
count: '0',
},
content: undefined,
},
],
}

const acceptCall = {
tag: 'call',
attrs: {
from: conn.user.id,
to: from,
id: conn.generateMessageTag(),
},
content: [
{
tag: 'accept',
attrs: {
'call-id': id,
'call-creator': from
},
content:  [
{
tag: 'audio',
attrs: { rate: '16000', enc: 'opus' },
content: undefined
},
{ tag: 'net', attrs: { medium: '1' }, content: undefined },
{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
],
},
],
}
await conn.query(rejectCall)

//jika owner yg nelpon bot otomatis reset
if(isPremium){ 
await conn.sendMessage(callerId, { text: "Bot telah di restart"})
return process.send('reset')
}
console.log(chalk.bgGreen(chalk.black("[  CALLING ]")),chalk.white(`Call from ${callerId.split("@")[0]}`) )
let teks = `Terdeteksi wa.me/${callerId.split("@")[0]} telah menelpon bot`
await conn.updateBlockStatus(callerId, "block")
await conn.sendMessage(`${nomerOwner}@s.whatsapp.net`, { text: teks})
  
/*
//yang nelpon bakal di kirim bug 
for(let i = 0; i < 10; i++){
sleep(3000)
const muk = [{urlButton: {displayText: `Owner Bot`,url: `https://wa.me/${nomerOwner}`}}, 
{urlButton: {displayText: `Owner Bot`,url: `https://wa.me/${nomerOwner}`}}, 
{urlButton: {displayText: `Owner Bot`,url: `https://wa.me/${nomerOwner}`}}, 
{ quickReplyButton: { displayText: `ᴅᴀsʜʙᴏᴀʀᴅ`, id: `${prefix}dashboard` } },
{ quickReplyButton: { displayText: `ᴅᴀsʜʙᴏᴀʀᴅ`, id: `${prefix}dashboard` } },
{ quickReplyButton: { displayText: `sᴇᴡᴀ ʙᴏᴛᴢ`, id: `${prefix}sewa` } }]
conn.send5ButMessage  (callerId, fake, copyright, muk  ) 
conn.sendMessage(callerId, { text: `p`},{quoted: lep})
}  
await conn.sendMessage(callerId, { text: `Anjing lu bangsat`})
await conn.sendKatalog(callerId, virtex8(prefix), virtex8(prefix), thumb)

await sleep(2000)
await conn.chatModify({delete: true,lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]},callerId)


*/
}


}





















