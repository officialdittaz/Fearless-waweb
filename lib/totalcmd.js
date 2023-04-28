import fs from 'fs'
import toMs from 'ms'
//const allcommand = JSON.parse(fs.readFileSync('./database/allcommand.json'));

 let cmdAdd = function(run, time, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === run) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].totalcmd += 1
        //fs.writeFileSync('./database/hitToday.json', JSON.stringify(_db))
    } else {
        const bulin = ({
        	id: run,
            expired: Date.now() + toMs(time),
            totalcmd: 1
                })
        _db.push(bulin)
        //fs.writeFileSync('./database/hitToday.json', JSON.stringify(_db))
    }
}

 let expiredCmd = ( _dir, _db) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired && _dir[i].id === "run" ) {
                position = i
            }
        })
        if (position !== null) {
                
if(_db.length !== 0){
console.log(`Total hit telah di reset`)
_db.length = 0
//fs.writeFileSync('./database/dashboard.json', JSON.stringify(db))
          
_dir.splice(position, 1)
//fs.writeFileSync('./database/hitToday.json', JSON.stringify(_dir))
  
}


        }
    }, 2000)
}


 let getHit = function(run, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === run) {
            position = i
        }
    })
    if (position !== false) {
        return _db[position].totalcmd
    }
}




//Fitur Autoclear chat
 let addAutoClear = async (m, waktu, _dir) => {
if(m.sender !== m.key.remoteJid) return
let position = null
Object.keys(_dir).forEach((i) => {
if (_dir[i].key.remoteJid === m.sender) {
position = i
}
})
if (position !== null) {
_dir[position].key = m.key
_dir[position].messageTimestamp = m.messageTimestamp
} else {
if(m.fromMe) return
let obj = {id: m.sender, key: m.key, messageTimestamp: m.messageTimestamp, expired: Date.now() + toMs(waktu) } 
_dir.push(obj)
}  
if (global.db.data) await global.db.write()
}


 let autoClearChat = async (conn,_dir) => {
let position = null
Object.keys(_dir).forEach((i) => {
if (Date.now() >= _dir[i].expired) {
position = i
}
})
if (position !== null) {	
await conn.chatModify({delete: true,lastMessages: [{ key:_dir[position].key, messageTimestamp: _dir[position].messageTimestamp }]},_dir[position].id)
await _dir.splice(position, 1)
console.log("Sukses clear chat")  
if (global.db.data) await global.db.write()
}
}

 let checkAutoClear = function(namenya, claim) {
    let status = false
    Object.keys(claim).forEach((i) => {
        if (claim[i].id === namenya) {
            status = true
        }
    })

    return status
}






//FITUR KEAMANAN UNTUK BOT
 let createDataId= (nama,_level) => {                                                                                                                      
 let obj = { name: nama, id: [] }
_level.push(obj)
//fs.writeFileSync('./database/data.json', JSON.stringify(_level))
}




 let getDataId = function(nama, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].name === nama) {
            position = i
        }
    })
    if (position !== false) {
        return _db[position].id
    }
}


 let addDataId = function(idgc, nama, _db){
    var found = false;
    Object.keys(_db).forEach((i) => {
        if(_db[i].name == nama){
            found = i
        }
    })
    if (found !== false) {
        _db[found].id.push(idgc)
        //fs.writeFileSync('./database/data.json',JSON.stringify(_db));
    }
}


 let removeDataId = function(nama, idgc, _db){
    var found = false;
    Object.keys(_db).forEach((i) => {
        if(_db[i].name == nama){
            found = i
        }
    })
    if (found !== false) {
       // _db[found].id.splice(idgc, 1)
      _db[found].id.splice(_db[found].id.indexOf(idgc, 1))
        //fs.writeFileSync('./database/data.json',JSON.stringify(_db));
    }
}



 let checkDataId = function(nama, idgc, _db){
  
    var found = false;
    var status = false
    Object.keys(_db).forEach((i) => {
        if(_db[i].name == nama){
            found = i
        }
    })
    if (found !== false) {
     for (let indexs of  _db[found].id){
     if( indexs == idgc){
     	status = true
     }
        }
    }
    return status
}



 let checkDataName = function(nama, idgc, claim) {
    let status = false
    Object.keys(claim).forEach((i) => {
        if (claim[i].name === nama) {
            status = true
        }
    })
return status
}



 let Succes = function(cmd, _db, allcommand){


   let index = false
  for (let i of allcommand){
    if(i == cmd){
      index = true
    }
  }
  
  if(index == false){
  allcommand.push(cmd)
  //fs.writeFileSync('./database/allcommand.json', JSON.stringify(allcommand))
  }
       
        
    
	
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].cmd === cmd) {
            position = i
          
        }
    })
    if (position !== false) {
        _db[position].succes += 1
        //fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))
    } else {
        const bulin = ({
            cmd: cmd,
            succes: 1,
            failed: 0
                })
        _db.push(bulin)
        //fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))

    }
}

 let Failed = function(cmd, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].cmd === cmd) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].succes -= 1
        _db[position].failed += 1
        //fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))
    } else {
        const bulin = ({
            cmd: cmd,
            succes: 0,
            failed: 1
                })
        _db.push(bulin)
        //fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))
    }
} 


 let Nothing = function(cmd, _db, allcommand){
	allcommand.splice(allcommand.indexOf(cmd), 1)
  //s.writeFileSync('./database/allcommand.json', JSON.stringify(allcommand))
	
    Object.keys(_db).forEach((i) => {
        if (_db[i].cmd === cmd) {
            _db.splice(i, 1)
           // fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))
        }
    })
return true
}


export default { Nothing,Failed,Succes, checkDataName, createDataId, addDataId, removeDataId, checkDataId, getHit, cmdAdd, expiredCmd }








