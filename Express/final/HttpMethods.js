const express = require("express");
const app = express();
const { people } = require("./data");

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(401).json({ success: false, msg: "Please provide name" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(404).send("Please provide credentials!");
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id))

  if (!person){
    return res.status(404).json({success:false, msg:'not found the person'})
  }
  const People = people.map((person)=>{
    if (person.id === Number(id)){
        person.name = name
    }
    return person
  })
  res.status(200).json({success:true, data:People})
});
app.delete("/api/people/:id", (req,res)=>{
    const person = people.find((person)=>person.id === Number(req.params.id))

    if(!person){
        return res.status(404).json({success:false,msg:'Cannot find the person with the given id'})
    }
    const newPeople = people.filter((person) => person.id != Number(req.params.id))
    res.status(200).json({success:true, data:newPeople})
})
app.all("*", (req, res) => {
  res.status(404).send("Resource not found..!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
