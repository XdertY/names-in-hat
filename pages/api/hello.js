// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const url = require("url")
const fs = require('fs');
const { join } = require('path');
const dir = __dirname;

export default (req, res) => {
  let rawdata = fs.readFileSync("/var/task/.next/serverless/pages/api/_files/db.json");
  let data = JSON.parse(rawdata);
 
  console.log(data.names);
  const yourNameKey = url.parse(req.url,true).query.name;
  if(data.players[parseInt(yourNameKey) - 1] === 1) {
    res.statusCode = 200;
    res.json({name: "Вече си теглил"});
  }
  else {
    let yourName = "";
    switch(yourNameKey) {
      case '1' : yourName = "Асен"; data.players[0] = 1; break;
      case '2' : yourName = "Никол"; data.players[1] = 1; break;
      case '3' : yourName = "Стефчо"; data.players[2] = 1 ;break;
      case '4' : yourName = "Тони"; data.players[3] = 1 ;break;
      case '5' : yourName = "Алекс"; data.players[4] = 1; break;

    }
    let currNames = data.names.filter(el => el !== yourName)
    const index = Math.floor(Math.random()*currNames.length);
    const name  = currNames[index];
    data.names = data.names.filter(el => el !== name)
    console.log(data.names);
    fs.writeFileSync("./var/task/.next/serverless/pages/api/_files/db.json", JSON.stringify(data), (err) => console.log(err));
    res.statusCode = 200;
    res.json({ name });
  } 
}
