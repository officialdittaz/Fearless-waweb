import func from "./lib/func.js"
import * as mywajs from 'mywajs'
import qrcode from 'qrcode-terminal'
import chalk from 'chalk'
import moment from 'moment-timezone'
import fs from "node:fs"
import {spawn} from 'node:child_process'
import {exec} from 'node:child_process'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import os from 'node:os'
import util from 'util'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Collection from "./lib/collection.js"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const version = require("mywajs/package.json").version 
global.reloadFile = (file) => reloadFile(file)
global.commands = new Collection()
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


global.npm = {
    mywajs: mywajs,
    qrcode: qrcode,
    chalk: chalk,
    moment: moment,
    fs: fs,
    spawn: spawn,
    exec: exec,
    path: path,
    fileURLToPath: fileURLToPath,
    os: os,
    util: util,
   Collection: Collection
}

// MY SET GLOBAL
global.set = {
    getses: async (folder) => {
        var get = await getSes(folder)
        return bytes(get)
    },
    mywa: {},
    owner: ["6285156137901"],
    ses: {
        path: '.mywajs_auth',
        name: 'session'
    },
    opt: {
        public: false,
        antiCall: false,
        prefix: "#",
        URI: "mongodb+srv://wweb:mywa1337@cluster0.aybyqhr.mongodb.net/?retryWrites=true&w=majority",
    },
    func: func,
    //  scrape: scrape,
    // limit
    limit: {
        free: 25,
        premium: 250,
        VIP: "Infinity",
        download: {
            free: 42300000, // use byte
            premium: 423000000, // use byte
            VIP: 1130000000, // use byte 
        }
    },

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




