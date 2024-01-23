const {updateOne, deleteOne, getAll, getOne, postOne} = require('../Controllers/controller')
const express = require('express')
const router = express.Router()

router.route("/").post(postOne).get(getAll);
router.route('/:id').get(getOne).patch(updateOne).delete(deleteOne)

module.exports = router