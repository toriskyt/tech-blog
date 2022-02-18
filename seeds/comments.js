const { Comments } = require('../models')

const commentData = [{
    content: "Hi, there!",
    user_id: 1,
    post_id: 1
},
{
    content: "Good to meet you!",
    user_id: 2,
    post_id: 2
},
{
    content: "Remember to paint the roses red!",
    user_id: 3,
    post_id: 3
}
];

const seedComments = () => Comments.bulkCreate(commentData, {
    individualHooks: true
});

module.exports = seedComments;