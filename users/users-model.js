const db = require("../data/dbconfig");

module.exports = {
    find,
    findBy,
    findById,
    add
};

function find() {
    return db("users");
};

function findBy(filter) {
    return db("users")
        .where("filter")
        .limit(1);
};

function findById(id) {
    return db("users")
        .where({ id })
        .limit(1);
};

async function add(user) {
    try {
        const [id] = await db("users")
            .insert(user)
        return findBy({ username: user.username})
    } catch(err) {
        res.send({
            message: "error creating user"
        })
    }
};