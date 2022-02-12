const router = require("express").Router();
const { contentType } = require("express/lib/response");
const{Users, Posts, Comments} = require("../models")

router.get("/", (req, res) => {
    Posts.findAll({
        attributes: [
            "title",
            "content",
            "created_at"  
        ]
    })
})
