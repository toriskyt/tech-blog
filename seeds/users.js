const { Users } = require('../models')

const userData = [{
    username: 'Carly',
    password: 'doodles'
},

{
    username: 'Ben',
    password: 'pooka'  

},

{
    username: 'Maddie',
    password: 'mads'

},
];

const seedUsers = () => Users.bulkCreate(userData, {
    individualHooks: true
});

module.exports = seedUsers;