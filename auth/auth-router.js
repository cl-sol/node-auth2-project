const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../data/dbconfig");
const Users = require("../users/users-model");

router.post("/register", (req, res) => {
    const user = req.body;

    if(!(user.username && user.password && user.department)) {
        res.status(400).json({
            message: "Please complete required fields"
        })
    } else {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => res.status(500).json({
                message: "Error creating user"
            }))
    }
});

router.post("/login", (req, res) => {

});

module.exports = router;