// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let names = ["Асен", 'Никол', 'Стефчо', 'Тони', 'Алекс']
const url = require("url")


export default (req, res) => {
  const yourNameKey = url.parse(req.url,true).query.name;
  let yourName = "";
  switch(yourName) {
    case 1 : yourName = "Асен"; break;
    case 2 : yourName = "Никол"; break;
    case 3 : yourName = "Стефчо"; break;
    case 4 : yourName = "Тони"; break;
    case 5 : yourName = "Алекс"; break;

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
  console.log(index, names);
}
