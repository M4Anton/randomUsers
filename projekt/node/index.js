const fetch = require("node-fetch");
const url = "https://randomuser.me/api/?results=10&inc=name,location,email,nat,picture&noinfo";
const fs = require('fs');
const express = require('express');
const cors = require('cors');




const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    fs.writeFile("db.json", JSON.stringify(json), (err) =>{
    	if(err){
    		console.log(err);
    	}
    })
  } catch (error) {
    console.log(error);
  }
};


fs.readFile('./db.json', (err,data) =>{
	if(err)
		console.log(err);
	if(data.toString() == '' || data.toString() == '{"results":[]}')
		getData(url);
})

const app = express();
app.use(cors());
app.use(express.json());
app.get('/results', (req, res) =>{
  let data = require('./db.json')
  res.json(data)
})

app.post('/results', (req, res) =>{
fs.writeFile('./db.json', JSON.stringify(req.body), (err) =>{
  if(err) throw err;
});
res.send('Success!')
})

app.listen(3001);