const { Users } = require('../models/seeds')

const userData = [{
    username: '',
    password: ''
}

{
    username: '',
    password: ''  

}

{
    username: '',
    password: ''

}
];

const seedUsers = () => Users.bulkCreate(userData);

module.exports = seedUsers;