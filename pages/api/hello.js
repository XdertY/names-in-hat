// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let names = ["Асен", 'Никол', 'Стефчо', 'Тони', 'Алекс']
const url = require("url")


export default (req, res) => {
  const yourName = url.parse(req.url,true).query.name;
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
