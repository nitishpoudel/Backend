const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

//Add new tea//

 let teaData = [];
 let nextId = 1;

app.post('/teas', (req, res) => {
  const { name, price } = req.body;
  const newTea = {id: nextId++, name, price};
  teaData.push(newTea);
  res.status(201).send(newTea);
 
});
///get all route tea//
app.get('/teas',(req,res) => {
  res.status(201).send(teaData)
})
//Get tea by id//
app.get('/teas/:id',(req,res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if(!tea){
    return res.status(401).send('Tea not found');
  }
  res.status(201).send(tea);
})


///Update//
app.put('/teas/:id',(req,res) => {
   const teaId = req.params.id
   const tea = teaData.find(t => t.id === parseInt(req.params))
   if(!tea){
    return res.status(401).send("Tea not found")
   }
   const {name,price} = req.params;
   tea.name = name;
   tea.price = price;
   res.send(200).send(tea);

})
//Delete tea//
app.delete('/teas/:id',(req,res) => {
 const index =  teaData.findIndex(t => t.id === parseInt(req.params));
 if(index === -1){
  return res.send(401).send('tea not found');
 }
 teaData.splice(index,1);
  return res.status(201).send('deleted');


})





app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));