// 这是用来分离demos.json的工具脚本
const fs = require('fs')
fs.readFile('assets/resources/spine/demos.json',(err,data)=>{
    if (err) {
        console.log(err)
    } else {
        let s = JSON.parse(data.toString('utf8'))
        // for (const name in s) {
        //     if (s.hasOwnProperty(name)) {
        //         console.log(name)
        //     }
        // }
        // return
        fs.writeFile('assets/resources/spine/dragon.json',JSON.stringify(s.dragon),(err)=>{
            if (err) {
                console.log(err)
            } else {
                console.log('success')
                console.log(s.dragon)
            }
        })
        // console.log(s.heroes)
    }
})