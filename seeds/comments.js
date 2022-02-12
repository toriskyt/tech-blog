const { Comments } = require('../models/seeds')

const commentData = [{
    comment_text: "",
    user_id: 1,
    post_id
},
{
    comment_text: "",
    user_id: 2,
    post_id: 2
},
{
    comment_text: "",
    user_id: 3,
    post_id: 3
}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;