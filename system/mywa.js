import "../setting.js"
import { Client, serialize } from "./lib/serialize.js"
import { Message, readCommands } from "./event/message.js"
import { database as databes } from "./lib/lib.database.js"

const database = new databes()

async function start() {


    const content = await database.read()
   


    mywa.on("loading_screen", (percent, message) => {
        console.log(npm.chalk.bgBlack(npm.chalk.green(message)) + " :" + npm.chalk.bgBlack(npm.chalk.yellow(percent)))
    })

   

    mywa.on("message_create", async (message) => {
        const m = await (await serialize(mywa, message))
        await (await Message(mywa, m))
    })

  

 

  

    return mywa
}


start()



