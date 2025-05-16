global.__dirpath = __dirname;

const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const SQLiteStore = require('connect-sqlite3')(session);

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require(path.join(__dirname, 'data', 'db'));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.use(
    new LocalStrategy(function verify(username, password, cb) {
        db.get('SELECT * FROM Users WHERE username = ?', username, (err, user) => {
            if (err) return cb(err);
            if (!user) return cb(null, false, { message: 'Incorrect username or password.' });

            const accept = bcrypt.compareSync(password, user.password);
            if (!accept) return cb(null, false, { message: 'Incorrect username or password' });

            return cb(null, user);
        });
    }),
);

const app = express();
const PORT = process.env.PORT || 3000;

nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
});
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser(process.env.SESSION_SECRET || "twinkle frinkle littol star, what's a wonder good you are!"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
        store: new SQLiteStore({
            dir: path.join(__dirname, 'data'),
        }),
        secret: process.env.SESSION_SECRET || "twinkle frinkle littol star, what's a wonder good you are!",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14,
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require(path.join(__dirname, 'router')));

app.listen(PORT);

require(path.join(__dirname, 'getDomains'));
