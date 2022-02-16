const path = require("path");
const express = require("express");
// brings in express middleware for session
const session = require("express-session");
// creating a sequelize store for session
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// brings in express middleware for handlebars
const exphbs = require("express-handlebars");

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const PORT = process.env.PORT || 3001;

const app = express();

// creating an instance of handlebars middleware with configuration
const hbs = exphbs.create({helpers});
// creating the configution for the session
const sess = {
    secret: "Super secret secret",
    cookie: {maxAge: 36000},
    resave: false,
    saveUnititialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// adding middleware to server
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// initializing view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// firing up the connection to the database, then express server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});