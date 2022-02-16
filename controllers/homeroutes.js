const router = require("express").Router();
const { Users, Posts, Comments } = require("../models")

router.get("/", (req, res) => {
    Posts.findAll({
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
            res.render("homepage", { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/post/:id", (req, res) => {
    Posts.findOne({
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
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            const post = dbPostData.get({ plain: true });
            console.log(post);
            res.render("single-post", { post, loggedIn: req.ssession.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get("/posts-comments", (req, res) => {
    Posts.findOne({
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
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            const post = dbPostData.get({ plain: true });

            res.render("posts-comments", { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;


