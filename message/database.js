
import {Low}  from "lowdb"
import { JSONFile } from "lowdb/node"
import yargs from 'yargs/yargs' 
import _ from 'lodash'

export default async function(){
//const {Low} = (await import("lowdb"))
//const { JSONFile } = (await import("lowdb/node"))

  
const isNumber = x => typeof x === 'number' && !isNaN(x)


  
global.isNumber = isNumber
global.db = new Low(new JSONFile(`database/database.json`))
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(conn), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
allcommand: [],
anonymous: [],
blockcmd: [],
banned: [],
premium: [],
claim: [],
data: [],
sewa: [],
lowfeature : [],
antispam: [],
dashboard: [],
listerror: [],
sticker: {},
audio: {},
hittoday: [],
clearchat: [],
users: {},
chats: {},
settings : {},
kickon : {},
others: {},
...(global.db.data || {})
}
global.db.chain = _.chain(global.db.data)
}
await loadDatabase()


const settings = global.db.data.settings['settingbot']
if(settings){
  
//Auto set
if (!isNumber(settings.status)) setting.status = new Date() * 1
if (!('setmenu' in settings)) settings.setmenu = "document"
if (!('docType' in settings)) settings.docType = "docx"
if (!('Qoted' in settings)) settings.Qoted = "ftoko"
if (!('autoBio' in settings)) settings.autoBio = false
if (!('multi' in settings)) settings.multi = true
if (!('prefix' in settings)) settings.prefix = "!"
if (!('fake' in settings)) settings.fake = botName
if (!('autoblockcmd' in settings)) settings.autoblockcmd = false
if (!('fake1' in settings)) settings.fake1 = "Extream"
if (!('replyType' in settings)) settings.replyType = "web"
if (!('setwelcome' in settings)) settings.setwelcome = "type11"
if (!('autoReport' in settings)) settings.autoReport = true
if (!('autoLevel' in settings)) settings.autoLevel = true
if (!('autoSticker' in settings)) settings.autoSticker = false

 
} else { global.db.data.settings['settingbot'] = {
status: new Date() * 1, 
setmenu: "document",
docType: "docx",
Qoted: "ftoko",
autoBio: false,
multi: true,
prefix: "!",
fake: botName,
autoblockcmd: false,
fake1:"Extream",
replyType: "web",
setwelcome: "type11",
autoReport: true,
autoLevel: true,
autoSticker: false,
}
}








if (global.db.data) await global.db.write()  
}//akhir dari export default