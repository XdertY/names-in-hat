// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let names = ["Асен", 'Никол', 'Стефчо', 'Тони', 'Алекс'];
let players = [0, 0, 0, 0, 0];

const url = require("url")


export default (req, res) => {
  const yourNameKey = url.parse(req.url,true).query.name;
  if(players[parseInt(yourNameKey) - 1] === 1) {
    res.statusCode = 200;
    res.json({name: "Вече си теглил"});
  }
  else {
    let yourName = "";
    switch(yourNameKey) {
      case '1' : yourName = "Асен"; players[0] = 1; break;
      case '2' : yourName = "Никол"; players[1] = 1; break;
      case '3' : yourName = "Стефчо"; players[2] = 1 ;break;
      case '4' : yourName = "Тони"; players[3] = 1 ;break;
      case '5' : yourName = "Алекс"; players[4] = 1; break;

    }
    let currNames = names.map(el => {
      if(el !== yourName) return el;
    })
    const index = Math.floor(Math.random()*4);
    const name  = currNames[index];
    names = names.map(el => {
      if(el !== name) return el;
    })
    names.splice(index, 1);
    res.statusCode = 200;
    res.json({ name });
  } 
}
