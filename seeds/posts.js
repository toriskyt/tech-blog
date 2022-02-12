const { Posts } = require('../models/seeds')

const postData = [{
    title: "Title 1",
    content: "This is title 1",
    user_id: 1
},

{
    title: "Title 2",
    content: "This is title 2",
    user_id: 2
},

{
    title: "Title 3",
    content: "This is title 3",
    user_id: 3
}
];

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;