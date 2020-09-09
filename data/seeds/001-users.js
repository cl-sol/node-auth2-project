const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync("abc123", 10);
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: "bigdog1", 
          password: hash,
          department: "marketing"
        },
        {
          username: "angrycat", 
          password: hash,
          department: "outreach"
        },
        {
          username: "ferociousfrog", 
          password: hash,
          department: "comms"}
      ]);
    });
};
