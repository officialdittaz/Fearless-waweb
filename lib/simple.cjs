"use strict"
const fs = require("fs")
const toMs = require('ms')
const moment = require("moment-timezone")





exports.Socket = async (conn) => {






  
/**
* 
* @param {string} name 
* @returns 
*/
conn.getContactByName = async(name) => {
let contact = (await conn.getContacts()).filter(a => a.name && (a.name.toLowerCase().includes(name) || a.name.includes(name)))
if (contact.length == 0) return null
return contact
}  
  
return conn  
}

  
//------------------------------[ BATAS KATULISTIWA ]----------------------------\\


exports.smsg = async (conn, m) => {
  
if (!m) return



m.from = m.id.remote
m.chat = m.id.remote
m.fromMe = m.id.fromMe
m.Id = m.id.id
m._serialized = m.id._serialized
m.isGroup = m.from.endsWith('g.us') || false
m.sender = m.isGroup? m.id.participant._serialized : m.from

  
if(m.isGroup){
m.metadata = await m.getChat() 
m.groupName = m.metadata.groupMetadata.subject  
m.groupDesc =  m.metadata.groupMetadata.desc 
m.groupOwner =  m.metadata.groupMetadata.descOwner !== undefined ? m.metadata.groupMetadata.descOwner._serialized : "tidak ada"
m.groupId = m.metadata.groupMetadata.id._serialized 
m.groupMembers =  m.metadata.groupMetadata.participants.map(v => v.id._serialized) 
m.membersOut =  m.metadata.groupMetadata.pastParticipants 
m.groupAdmins =  m.metadata.groupMetadata.participants.filter(v => v.isAdmin ).map(v => v.id._serialized) 
m.isBotAdmin = m.groupAdmins.includes(conn.info.wid._serialized) 
m.isAdmin =  m.groupAdmins.includes(m.sender) 
m.mentions = (Array.isArray(m._data.mentionedJidList) && m._data.mentionedJidList.length !== 0) ? m._data.mentionedJidList.map(a => a._serialized) : []
}
  
m.budy =  m.type == "chat"? m._data.body : ""
//m.body = m.type == "chat"? m.body : m.type == "video"? m.body : m.type == "image"? m.body : m.type == 'buttons_response'? m. selectedButtonId : "Nothing"
m.body = m?.selectedButtonId || m?.selectedRowId || m?._data?.caption || m?._data?.body || m?.body || ''
m.isBot = (m.id?.id?.startsWith("3EB0")) || (m.id?.id?.startsWith("BAE5")) || false
m.senderNumber = m.sender.split("@")[0]
m.pushname = m._data.notifyName || (await conn.getContactById(m.sender)).pushname || "No Name"
m.args = m.body.trim().split(/ +/).slice(1)
m.arg = m?.body?.trim()?.split(/ +/) || []
m.text = m?.args?.join(" ")  
m.mentionByTag = m._data.mentionedJidList
m.mentionByReply = m._data.quotedParticipant !== undefined? m._data.quotedParticipant._serialized : false
if (conn.info) m.botNumber = conn.info.me._serialized || conn.info.wid._serialized
m.users = m.mentionByReply? m.mentionByReply : m.mentionByTag[0] || false
m.numberQuery = m.body.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@c.us`
m.myButton = m.isGroup && m.type == 'buttons_response' && m.mentionByReply !== m.botNumber
m.itsMe = m.fromMe
m.isMedia = m.hasMedia
m.isNewMsg = m._data.isNewMsg
m.ephemeralDuration = m._data.ephemeralDuration || 0

if (m.isMedia) {
m.deprecatedMms3Url = m._data.deprecatedMms3Url
m.directPath = m._data.directPath
m.mime = m._data.mimetype
m.filehash = m._data.filehash
m.encFilehash = m._data.encFilehash
m.mediaKey = m._data.mediaKey
m.width = m._data.width
m.height = m._data.height
if (m._data.mediaKeyTimestamp) m.mediaKeyTimestamp = m._data.mediaKeyTimestamp
if (m._data.size) m.fileSize = m._data.size
if (m._data.isViewOnce) {
m.isViewOnce = m._data.isViewOnce
m.caption = m._data.caption || ''
}
if (m._data.wavefrom) m.wavefrom = m._data.wavefrom
if (m._data.thumbnailWidth) m.thumbnailWidth = m._data.thumbnailWidth
if (m._data.thumbnailHeight) m.thumbnailHeight = m._data.thumbnailHeight
if (m._data.isAnimated) m.isAnimated = m._data.isAnimated
}







  

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


//custom function message
if (m.isMedia) m.downloadMedia = (filePath) => {
if (filePath) return conn.downloadAndSaveMediaMessage(m, filePath)
else return conn.downloadMediaMessage(m)
}
m.resend = () => conn.forwardMessage(m.from, m._serialized)
m.reply = (content, options = {}) => conn.sendMessage(options.from ? options.from : m.from, content, { quoted: m, ...options })

if (!m.author) delete m.author
if (!m.isStatus) delete m.isStatus
if (!m.isForwarded) delete m.isForwarded
if (m.forwardingScore === 0) delete m.forwardingScore
if (m.vCards.length === 0) delete m.vCards
if (!m.inviteV4) delete m.inviteV4
if (!m.orderId) delete m.orderId
if (!m.token) delete m.token
if(m.mediaKey == undefined) delete m.mediaKey
if (!m.hasMedia) {
delete m.duration
delete m.isGif
}
if (!m.isEphemeral) {
delete m.isEphemeral
delete m.ephemeralDuration
}


delete m.deviceType
delete m._data
delete m.mentionedIds
delete m.location
  
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