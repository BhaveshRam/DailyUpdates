let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(401).json({ success: false, msg: "Please provide name" });
  }
  res.status(201).json({ success: true, person: name });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: "not found the person" });
  }
  const People = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: People });
};

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));

  if (!person) {
    return res.status(404).json({
      success: false,
      msg: "Cannot find the person with the given id",
    });
  }
  const newPeople = people.filter(
    (person) => person.id != Number(req.params.id)
  );
  res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson,
}