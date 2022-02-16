const router = require("express").Router();
const { Users, Posts, Comments } = require("../models")

const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Posts.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "title",
            "content",
            "created_at"
        ],
        include: [{
            model: Comments,
            attributes: ["id", "content", "post_id", "user_id", "created_at"],
            include: {
                model: Users,
                attributes: ["username"]
            }
        },
        {
            model: Users,
            attributes: ["username"]
        }
    ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render("dashboard", {posts, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get("/edit/:id", withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "title",
            "content",
            "created_at"
        ],
        include: [{
            model: Users,
            attributes: ["username"]
        },
        {
            model: Comments,
            attributes: ["id", "content", "post_id", "user_id", "created_at"],
            include: {
                model: Users,
                attributes: ["username"]
            }
        }
    ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }

        const post = dbPostData.get({ plain: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})
router.get("/new", (req, res) => {
    res.render("new-post");
});

module.exports = router;