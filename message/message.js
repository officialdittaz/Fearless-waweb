
import { createRequire } from 'module'
import { fileURLToPath } from "url"
import fs from "fs"


export default async function(prefix,command) {
global.mess = {
wait: 'Tunggu sebentar ya kak',
query: '  query',
search: 'Searching...',
scrap: '*Scrapping...*',
success: 'Berhasil!',
limit: `[❕] Limit kamu sudah habis silahkan kirim .limit untuk mengecek limit`,
claimOn: `Kamu sudah melakukan claim sebelumnya, Harap claim lagi pada jam `,
wrongFormat: 'Format salah, coba liat lagi di menu',

error: {
stick: 'bukan sticker itu:v',
api: 'Error api atau linkya mungkin',
Iv: 'Linknya error:v',
link : "Link error!"
},

block:{
Bowner: `Maaf kak command tersebut telah di block oleh owner`,
Bsystem: `Command tersebut telah di block oleh system karena terjadi error`
},

 only: {
prem : 'Premium special features! Chat owner to get Premium access!',
group: 'Fitur ini dapat digunakan di Dalam Group!',
ownerB: 'Fitur Khusus Owner Bot!',
owner: 'Fitur Khusus Owner Bot!',
admin: 'Fitur dapat Digunakan oleh Admin Group!',
Badmin: 'Fitur dapat Digunakan Setelah Bot menjadi ADMIN!'
 }
  
 }
}



//reloadFile(import.meta.url)
let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, () => {
    fs.unwatchFile(fileP)
    console.log(`Update File "${fileP}"`)
    import(`${import.meta.url}?update=${Date.now()}`)
})


