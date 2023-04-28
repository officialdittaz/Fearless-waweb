"use strict"
import spin from 'spinnies'
import CFonts from 'cfonts'
import chalkAnimation from 'chalk-animation'
import qrcode from 'qrcode-terminal'

const spinnies = new spin();
const spinner = { 
  "interval": 120,
  "frames": [
"✖ [░░░░░░░░░░░░░░░]",
"✖ [■░░░░░░░░░░░░░░]",
"✖ [■■░░░░░░░░░░░░░]",
"✖ [■■■░░░░░░░░░░░░]",
"✖ [■■■■░░░░░░░░░░░]",
"✖ [■■■■■░░░░░░░░░░]",
"✖ [■■■■■■░░░░░░░░░]",
"✖ [■■■■■■■░░░░░░░░]",
"✖ [■■■■■■■■░░░░░░░]",
"✖ [■■■■■■■■■░░░░░░]",
"✖ [■■■■■■■■■■░░░░░]",
"✖ [■■■■■■■■■■■░░░░]",
"✖ [■■■■■■■■■■■■░░░]",
"✖ [■■■■■■■■■■■■■░░]",
"✖ [■■■■■■■■■■■■■■░]",
"✖ [■■■■■■■■■■■■■■■]"
  ]}
let globalSpinner;
const getGlobalSpinner = (disableSpins = false) => {
if(!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins});
return globalSpinner;
}
let spins = getGlobalSpinner(false)
  
  
const start = (id, text) => {
spins.add(id, {text: text})
}
const success = (id, text) => {
spins.succeed(id, {text: text})
}



export const connectionUpdate = async(conn) => {


  

console.log(chalk.magenta(`]─`),`「`,  chalk.red(`FEARLESS`), `」`,  chalk.magenta(`─[`))  
start(`1`,`Connecting...`)

conn.on('qr', qr => {
 console.log("CONNECTED, SCAN THIS QR...")
    qrcode.generate(qr, {small: true});
});


conn.on('authenticated', () => {
success(`1`,`[■■■■■■■■■■■■■■■] Connected`)
});  


conn.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});
  
conn.on('ready', () => {
    setTimeout(() => {
chalkAnimation.rainbow('Bot is Ready').start(); // Animation resumes
}, 2000);
});

/*
conn.on('loading_screen', (percent, message) => {
   // console.log('LOADING SCREEN', percent, message);
});
*/




}//akhir connection

