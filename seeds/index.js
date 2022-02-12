const seedComments = require('./comments');
const seedPosts = require('./posts');
const seedUsers = require('./users');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedAll();