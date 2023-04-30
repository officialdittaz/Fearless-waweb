import { createRequire } from 'module'
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"
const require = createRequire(import.meta.url)
const version = require("wwebjs/package.json").version 
global.reloadFile = (file) => reloadFile(file)
global.version = version
global.chalk = chalk
global.require = require
global.language = "id"
global.nomerOwner ="6285156137901"
global.nomerOwner2 = "62813390135872"
global.runWith = "Replit"
global.ownerName = "DITTAZ"
global.botName = "Fearless Botz" 
global.sessionName ="session"
global.setmenu ="location"
global.docType = "docx"
global.Qoted = "ftoko"
global.autoBio = false
global.baileysMd = true
global.antiSpam = true
//global.multi = true
//global.prefa = "!"
global.fake = botName
global.Console = false
//global.autorespon = false
global.copyright = `Baileys ${version}`
global.baileysVersion = `Baileys ${version}`
//global.On = "On"
//global.Off ="Off"
//global.autoblockcmd = false
global.fake1 ="Extream"
global.packName = "Extream"
global.authorName = "Crew"
global.replyType = "web"
global.setwelcome = "type11"
global.autoblockcmd = false
global.autoReport = true
global.autoLevel = true
global.autoSticker = false
global.gamewaktu = 60
global.limitCount = 30
global.Intervalmsg = 1000 //detik
global.openAI = "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"
global.fileStackApi ="AlDgaKtdiT1iL6CwlXMpWz" //daftar di filestack
global.apiflash ='9b9e84dfc18746d4a19d3afe109e9ea4'
global.gcounti = {
'prem' : 60,
'user' : 20
} 




async function reloadFile(file) {
	file = (file).url || (file)
	let fileP = fileURLToPath(file)
	fs.watchFile(fileP, () => {
		fs.unwatchFile(fileP)
		console.log(`Update File "${fileP}"`)
		import(`${file}?update=${Date.now()}`)
	})
}

reloadFile(import.meta.url)




