"use strict";
import toMs from 'ms'
import chalk from 'chalk'
import fs from "fs"
import moment from "moment-timezone"
//import {fetchJson,sleep} from "../lib/myfunc.js"
//import _spam from '../lib/antispam.js'
import { createRequire } from 'module'
import { fileURLToPath, URL } from 'url'


//Log text di group dan private chat
export const message = async(conn,m,budy) => {
if(budy && m.chat !== 'status@broadcast') await console.log(m.isGroup? 
chalk.bgMagentaBright(chalk.black("[  GROUP  ]")): //group chat
chalk.bgGreenBright(chalk.black("[ PRIVATE ]")),  //private chat
chalk.hex('#9767FC').overline(" " + budy), chalk.cyan('dari'),  //teks 
chalk.hex('#A8E643').overline(`${m.pushname}`), //nama users
m.isGroup? `${chalk.red('di gc')} ${chalk.red(m.groupName)}` : "") 
console.log(chalk.bgYellowBright(chalk.black(`ID: ${m.senderNumber}`)),
chalk.green(moment.tz('Asia/Jakarta').format('HH:mm')), //waktu
)//number

}


//Log command bot
export const commands = async(m,command) => {

console.log(chalk.bgCyanBright(chalk.black("[ COMMAND ]")),// command
chalk.blue(` ${command} [${m.args.length}]`), chalk.cyan('dari'),// teks
chalk.red(`${m.pushname}`),// nama
m.isGroup? `${chalk.red('di gc')} ${chalk.red(m.groupName)}` : "")//keterangan  
console.log(chalk.bgYellowBright(chalk.black(`ID: ${m.senderNumber}`)),
chalk.green(moment.tz('Asia/Jakarta').format('HH:mm')), //waktu
)//number
}

//Log error
export const error = async(m,command) => {

console.log(chalk.bgRed(chalk.black("[ ERROR ]")), chalk.green(moment.tz('Asia/Jakarta').format('HH:mm')), 
chalk.blue(`${command} [${m.args.length}]`))  
  
}


const __filename = new URL('', import.meta.url).pathname
//const __dirname = new URL('.', import.meta.url).pathname
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")),chalk.white(`${__filename}`) )
import(`${file}?update=${Date.now()}`)
})
