const {connectToDb,getDb} = require('../db')
const { ObjectId , $set} = require("mongodb");
let db
connectToDb((err)=>{
  if(!err){
    return err
  }
  db = getDb()
})

const getOne = (req, res) => {
  db.collection("practice")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ msg: "Cannot get the id" });
    });
};
const getAll = (req, res) => {
  let students = [];

  db.collection("practice")
    .find()
    .sort({ Name: 1 })
    .forEach((element) => students.push(element))
    .then(() => {
      res.status(200).json(students);
    })
    .catch(() => {
      res.status(500).json({ msg: "Error could not fetch the resources!" });
    });
};

const postOne = (req, res) => {
  const per = req.body;

  db.collection("practice")
    .insertOne(per)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ msg: "Cannot post the person" });
    });
};

const deleteOne = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("practice")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({ msg: "Error! Unable to find resource ID" });
      });
  } else {
    res.status(401).json({ msg: "Invalid ID" });
  }
};

const updateOne = (req, res) => {
  const per = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection("practice")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: per })
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({ msg: "Error! Unable to find resource ID" });
      });
  } else {
    res.status(401).json({ msg: "Invalid ID" });
  }
};

module.exports = {updateOne,deleteOne,getAll,getOne,postOne}