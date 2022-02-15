const router = require("express").Router();
const {Posts, Users, Comments} = require("../../models");
const sequalize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
    console.log("=============");
    Posts.findAll({
        attributes: [
            "id",
            "title",
            "content",
            "created_at"
        ],
        order: [
            ["created_at", "DESC"]
        ],
        include: [{
            model: Users,
            attributes: ["username"]
        },
        {
            model: Comments,
            attributes: ["id", "comment_text", "post_id", "created_at"],
            include: {
                model: Users,
                attributes: ["username"]
            }
        }
    ]
    })
    .then(dbPostData => res.json(dbPostData.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "content",
            "title",
            "created_at"
        ],
        include: [{
            model: Users,
            attributes: ["username"]
        },
        {
            model: Comments,
            attributes: ["id", 'comment_text', "post_id", "user_id", "created_at"],
            include: {
                model: Users,
                attributes: ["username"]
            }
        }
    ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: "No post found with this id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;