"use strict"
const fs = require("fs")
const toMs = require('ms')
const moment = require("moment-timezone")





exports.Socket = (conn) => {

  
  
  
}

  
//------------------------------[ BATAS KATULISTIWA ]----------------------------\\


exports.smsg = async (conn, m) => {




m.chat = m._data.id.remote
m.sender = m.from
m.fromMe = m.id.fromMe
m.metadata = m.chat.endsWith('@g.us')? await m.getChat() : false
m.isGroup = m.chat.endsWith('@g.us')? m.metadata.isGroup : false
//console.log(m.metadata)
m.groupName =  m.isGroup ? m.metadata.groupMetadata.subject  : []
m.groupDesc =  m.isGroup ? m.metadata.groupMetadata.desc : []
m.groupOwner =  m.isGroup && m.metadata.groupMetadata.descOwner !== undefined ? m.metadata.groupMetadata.descOwner._serialized : false || "tidak ada"
m.groupId =  m.isGroup ? m.metadata.groupMetadata.id._serialized  : []
m.groupMembers = m.isGroup ? m.metadata.groupMetadata.participants.map(v => v.id._serialized) : []
m.membersOut = m.isGroup ? m.metadata.groupMetadata.pastParticipants : false
m.groupAdmins = m.isGroup ? m.metadata.groupMetadata.participants.filter(v => v.isAdmin ).map(v => v.id._serialized) : []
m.isBotAdmin = m.isGroup ? m.groupAdmins.includes(conn.info.wid._serialized) : false
m.isAdmin = m.isGroup ? m.groupAdmins.includes(m.sender) : false 
m.budy =  m.type == "chat"? m._data.body : ""
m.body = m.type == "chat"? m.body : m.type == "video"? m.body : m.type == "image"? m.body : m.type == 'buttons_response'? m. selectedButtonId : "Nothing"

m.senderNumber = m.sender.split("@")[0]
m.pushname = m._data.notifyName || (await conn.getContactById(m.sender)).pushname || "No Name"
m.args = m.body.trim().split(/ +/).slice(1)
m.mentionByTag = m._data.mentionedJidList
m.mentionByReply = m._data.quotedParticipant !== undefined? m._data.quotedParticipant : false
m.botNumber = m.author
m.users = m.mentionByReply? m.mentionByReply : m.mentionByTag[0] || false
m.numberQuery = m.body.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@c.us`
m.myButton = m.isGroup && m.type == 'buttons_response' && m.mentionByReply !== m.botNumber
m.itsMe = m.sender == m.botNumber ? true : false

//Ucapan Waktu
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(timeWib < "23:59:00"){ var ucapanWaktu = 'Selamat malam' }
if(timeWib < "19:00:00"){ var ucapanWaktu = 'Selamat malam'}
if(timeWib < "18:00:00"){ var ucapanWaktu = 'Selamat sore'}
if(timeWib < "15:00:00"){ var ucapanWaktu = 'Selamat siang'}
if(timeWib < "11:00:00"){ var ucapanWaktu = 'Selamat pagi'}
if(timeWib < "06:00:00"){ var ucapanWaktu = 'Selamat pagi'}
m.ucapanWaktu = ucapanWaktu
m.text =  m.body 

  
  
return m
}
  
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log('di update')
console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")),chalk.white(`${__filename}`) )
delete require.cache[file]
require(file)
}) 