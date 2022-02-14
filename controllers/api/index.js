const router = require("express").Router();
const userRoutes = require('./user_routes.js');
const postRoutes = require('/post_routes');
const commentRouts = require("/comment_routes");
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRouts);

module.exports = router;