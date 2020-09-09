const router = require("express").Router();
const Users = require("./users-model");

//get all users
router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            users ? res.status(200).json(users) : res.status(400).json({
                message: "Could not retrieve users"
            })
        })
        .catch(err => res.status(500).json({
            message: "Error retrieving users"
        }))
})

module.exports = router;