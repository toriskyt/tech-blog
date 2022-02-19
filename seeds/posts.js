const { Posts } = require('../models')

const postData = [{
    title: "Warm greetings",
    content: "Greetings from Ben",
    user_id: 1
},

{
    title: "Rose maintenance",
    content: "Rose color important",
    user_id: 2
},

{
    title: "Introductions",
    content: "New aquaintences",
    user_id: 3
}
];

const seedPosts = () => Posts.bulkCreate(postData, {
    individualHooks: true
});

module.exports = seedPosts;