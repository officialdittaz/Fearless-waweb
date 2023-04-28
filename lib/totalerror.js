import fs from 'fs'


const add = (msg, command, _data) => {
    const obj = {
        error: msg,
        cmd: command
    }
    _data.push(obj)
    //fs.writeFileSync('./database/listerror.json', JSON.stringify(_data))

    return true;
}


const del = (command, _data) => {
    Object.keys(_data).forEach((i) => {
        if (_data[i].error === command) {
            _data.splice(i, 1)
            //fs.writeFileSync('./database/listerror.json', JSON.stringify(_data))
        }
    })
    return true
}



const check = (command, _data) => {
    let status = false
    Object.keys(_data).forEach((i) => {
        if (_data[i].error === command) {
            status = true
        }
    })

    return status
}


const clear = (_dir) => {
    Object.keys(_dir).forEach((i) => {
        _dir.splice(_dir[i], 1)
        //fs.writeFileSync('./database/listerror.json', JSON.stringify(_dir))
    })
console.log("Sukses clear all error")
}

export default {
    add,
    del,
  clear,
    check
}

