
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: bigdog1, 
          password: 'abc123',
          department: "marketing"
        },
        {
          username: angrycat, 
          password: 'abc123',
          department: "outreach"
        },
        {
          username: ferociousfrog, 
          password: 'abc123',
          department: "comms"}
      ]);
    });
};
