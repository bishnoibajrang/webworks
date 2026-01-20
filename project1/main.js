const { log } = require("console")
const fs = require("fs")

console.log(fs)

console.log("starting")
// fs.writeFileSync("bajrang.txt", "bajrang is a good boy")
fs.writeFile("bajrang2.txt","Bajrang is a good boy2", ()=>{
    console.log("done");
    fs.readFile("bajrang2.txt",(error,data) => {
        console.log(error,data.toString());
    })
})
console.log("ending")