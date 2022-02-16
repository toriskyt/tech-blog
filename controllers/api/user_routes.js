const router = require("express").Router();
const { Users, Posts, Comments } = require("../../models");

router.get("/", (req, res) => {
    Users.findAll({
        attributes: { exclude: ["[password]"] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    Users.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Posts,
            attributes: [
                "id",
                "title",
                "content",
                "created_at"
            ]
        },
        {
            model: Comments,
            attributes: ["id", "content", "created_at"],
            include: {
                model: Posts,
                attributes: ["title"]
            }
        },
        {
            model: Posts,
            attributes: ["title"],
        }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: "No user found with this id"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
    Users.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: "No user with that username" });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: "Wrong password"});
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "You are logged in"});
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.put("/:id", (req, res) => {
    Users.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: "No user found with this id"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
    Users.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;