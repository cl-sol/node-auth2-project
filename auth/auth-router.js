const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../data/dbconfig");
const Users = require("../users/users-model");
const secrets = require("../config/secrets");

router.post("/register", async (req, res) => {
    
    const user = req.body;
    // console.log(user)

    if(!(user.username && user.password && user.department)) {
        res.status(400).json({
            message: "Please complete required fields"
        })
    } else {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        // console.log(hash)

        Users.add(user)
            .then(user => {
                delete user.password
                res.status(201).json(user);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                message: "Error creating user"
            })
        })
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)

    if(!(username && password)) {
        res.status(400).json({
            message: "Missing username and/or password"
        })
    } else {
        Users.findBy({ username })
            .then(user => {
                console.log(user)
                if(user && bcrypt.compareSync(password, user.password)) {
                    //create token
                    const token = generateToken(user);
                    console.log(token)

                    //send token back to client
                    res.status(200).json({
                        message: `Welcome, ${user.username}!`, token
                    })
                } else {
                    res.status(403).json({
                        message: "You shall not pass!"
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: "Error retrieving login data"
                })
            })
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
};

module.exports = router;