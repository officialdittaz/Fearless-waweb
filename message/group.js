import util from 'util'
import moment from "moment-timezone"
import fs from "fs"
import chalk from 'chalk'
import { getBuffer, getRandom, getGroupAdmins,sleep} from "../lib/myfunc.js"
const bg = "https://tinyurl.com/y23xrfhu"



//Function update member
export const memberUpdate = async(conn, anu) => {

var jeda = false
if(jeda) return console.log('spam welcome aktif')
jeda = true
  
try{
const { id, participants, action } = anu
if((action == "remove" || action == "promote"||action == "demote" ) && anu.participants[0].split("@")[0].includes(conn.user.id.split(":")[0]) ) return
const type1 = setwelcome == "type1"
const type2 = setwelcome == "type2"
const type3 = setwelcome == "type3"
const from = anu.id
const botNumber = conn.user.jid 
const groupMetadata = await conn.groupMetadata(from) || (conn.chats[from] || {}).metadata
const groupName =  groupMetadata.subject || []
const groupLength = groupMetadata.participants.length
const sender = anu.participants[0];
const senderNumber = sender.split("@")[0];
const groupMembers =  groupMetadata.participants || []
const groupAdmins = getGroupAdmins(groupMembers) || []
const groupDesc =  groupMetadata.desc || []
const groupOwner =  groupMetadata.owner || []
const user = groupMembers.find(u => conn.decodeJid(u.id) === sender)  || {} 
const bot = groupMembers.find(u => conn.decodeJid(u.id) == conn.user.jid) || {} 
const isRAdmin = user && user.admin == 'superadmin' || false
const isAdmin = isRAdmin || user && user.admin == 'admin' || false 
const isBotAdmin = bot && bot.admin == 'admin' || false // Are you Admin?  
const pushname =  await conn.getName(sender)
const oneMem = anu.participants.length === 1
const itsMe = sender === botNumber
const timeWib = moment.tz("Asia/Jakarta").format("HH:mm")
const chat = global.db.data.chats[id] || {}
const add = action == "add" 
const remove = action == "remove"
const isBanchat = db.data.chats[from].banchat 
if (isBanchat) {return}
let m = {
chat :from,
pushname : pushname,
sender : sender
}

//Import allfake.js
await (await import('./allfake.js')).default(m)

//Group Update Console.log
if (add && oneMem) console.log(chalk.magenta("[GRUP UPDATE]"), chalk.green(`${pushname} telah keluar dari gc`), chalk.magenta(`${groupName}`))
if (remove && oneMem) console.log(chalk.magenta("[GRUP UPDATE]"), chalk.green(`${pushname} telah bergabung di gc`), chalk.magenta(`${groupName}`))


//Auto kick jika itu user yang sudah di tandai
let kickon = db.data.kickon[from]
if(add && kickon && kickon.includes(senderNumber)){
	
let teks = `@user tidak di izinkan masuk
karena dia telah keluar dari group ini sebelumnya,
dan juga sudah di tandai sebagai user biadap`
let text = teks.replace('user', await conn.getName(sender))
       
await conn.sendMessage(from, {text,contextInfo: {mentionedJid: [sender]}},{quoted: ftoko})
if(!isBotAdmin) return conn.sendMessage(from, {text: `Gagal  mengeluarkan @${senderNumber} dari group karena bot bukan admin`,contextInfo: {mentionedJid: [sender]}},{quoted: ftoko})
if(isBotAdmin) return conn.groupParticipantsUpdate(from, [sender], 'remove')
} 
  
try { //To get photo of user
var pp = await conn.profilePictureUrl(sender, 'image')
} catch (e) {
var pp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
  
 /*
try { // To get photo of group
var ppgc = await conn.profilePictureUrl(from, 'image')
} catch (e) {
var ppgc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
}
*/
  
const contextInfo = {
forwardingScore: 50, 
isForwarded: true, 
mentionedJid: [sender],
externalAdReply:{
title: copyright,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: pp,
}
}  
  

  
  
switch (action) {
 
case 'add':{
let teks = `Halo @user
welcome to group ${groupName}
jangan lupa baca dan folowing rules group
semoga betah yak`
const welcomeText =  (chat.sWelcome|| teks).replace('user', await conn.getName(sender)).replace('@desc', groupDesc.toString() || 'unknow') 
if (chat.welcome && !itsMe && oneMem)  conn.sendMessage(from, { contextInfo, text: welcomeText },{quoted: ftoko})
}
break


case 'remove':{
let teks = `Selamat tinggal @user
jangan balik lagi sini lu ye`
const byeText =  (chat.sBye|| teks).replace('user', await conn.getName(sender))
if (chat.welcome && !itsMe && oneMem ) conn.sendMessage(from, { contextInfo, text: byeText },{quoted: ftoko})
}
break


case 'promote':{
const promoteText = (chat.sPromote || '@user cie jadi admin nih :v').replace('user', await conn.getName(sender))     
conn.sendMessage(from, { contextInfo, text: promoteText },{quoted: ftoko})
 
}
break
            
case 'demote':{
const demoteText = (chat.sDemote || '@user Yahaha kena demote awokawok :v').replace('user', await conn.getName(sender))      
conn.sendMessage(from, { contextInfo,text: demoteText },{quoted: ftoko})
}
break



	
}// Akhir dari swith action
  
  
await sleep(5000)  
jeda = false

  
} catch (err) {
jeda = false
console.log(err)
let e = String(err) 
if (e.includes("this.isZero")) {return}
if (e.includes("rate-overlimit")) {return}
if (e.includes('Connection Closed')){ return }
if (e.includes('Timed Out')){ return }
console.log(chalk.white('GROUP :'), chalk.green(e))
}   
}

//----------------BATAS--------------\\

//Function Update group
export async function groupsUpdate(conn,anu) {
try{
console.log(anu)
/*
const from = anu[0].id
const botNumber = conn.user.jid 
const groupMetadata = await conn.groupMetadata(from) || (conn.chats[from] || {}).metadata
const groupName =  groupMetadata.subject || []
const groupLength = groupMetadata.participants.length
const groupMembers =  groupMetadata.participants || []
const groupDesc =  groupMetadata.desc || []
const groupOwner =  groupMetadata.owner || []
const bot = groupMembers.find(u => conn.decodeJid(u.id) == conn.user.jid) || {} // Your Data
const isBotAdmin = bot && bot.admin == 'admin' || false // Are you Admin?  

let chats = global.db.data.chats[id], text = ''



try { // To get photo of group
var ppgroup = await conn.profilePictureUrl(from, 'image')
} catch (e) {
var ppgroup = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
}

const contextInfo = {
forwardingScore: 50, 
isForwarded: true, 
externalAdReply:{
title: copyright,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: ppgroup,
}
}  



for (let i of anu) {
if (!from) continue
if (!chats?.detect) continue
if (i.desc) text = (chats.sDesc || 'Description has been changed to\n@desc').replace('@desc', groupUpdate.desc)
if (i.subject) text = (chats.sSubject || 'Subject has been changed to\n@subject').replace('@subject', groupUpdate.subject)
if (i.icon) text = (chats.sIcon || 'Icon has been changed to').replace('@icon', groupUpdate.icon)
if (i.revoke) text = (chats.sRevoke ||  'Group link has been changed to\n@revoke').replace('@revoke', groupUpdate.revoke)
if (announce ) text = (chats.sAnnounceOn ||  '*Group has been closed!*')
if (!i.announce) text = (chats.sAnnounceOff ||  '*Group has been open!*')
if (i.restrict ) text = (chats.sRestrictOn || '*Group has been all participants!*')
if (!i.restrict ) text = (chats.sRestrictOff || '*Group has been only admin!*')
if (!text) continue
conn.sendMessage(from,{contextInfo,text})
}
  */
} catch(err){
console.log(err)
}                        

}