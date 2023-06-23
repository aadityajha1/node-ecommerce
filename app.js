
const express = require('express');
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const jwt = require("jsonwebtoken"); 
const { name } = require('ejs');

const PORT = process.env.PORT || 4003;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.get('/', (req, res) => {
    res.render('index');
});


app.get("/users/register", (req, res) => {
    res.render('register');
});

app.get("/users/login", (req, res) => {
    res.render('login');
});


app.get("/users/dashboard", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.render('dashboard', { user: authData.name });
        }
    });
});


app.post("/users/register", async (req, res) => {
    let { name, email, password, password2 } = req.body;
    console.log({
        name,
        email,
        password,
        password2
    });
    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({ message: "Enter all the fields" });
    }

    if (password != password2) {
        errors.push({ message: "Passwords do not match" });
    }
    if (errors.length > 0) {
        res.render("register", { errors });
    } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        pool.query(
            `SELECT * FROM amnil_users WHERE email=$1`,
            [email],
            (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);

                if (results.rows.length > 0) {
                    errors.push({ message: "Email already used" });
                    res.render("register", { errors });
                } else {
                    pool.query(
                        `INSERT INTO amnil_users (name,email,password)
                        VALUES ($1,$2,$3)
                        RETURNING id,password`, [name, email, hashedPassword],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log(results.rows);

                            req.flash("success_msg", "You are now registered. Please login");
                            res.redirect("/users/login");
                        }
                    )
                }
            }
        );
    }
});


app.post("/users/login", (req, res) => {
    const { email, password } = req.body;

    pool.query(
        `SELECT * FROM amnil_users WHERE email = $1`,
        [email],
        (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results.rows);

            if (results.rows.length > 0) {
                const user = results.rows[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Internal Server Error");
                    }
                    if (isMatch) {
                        const token = jwt.sign({ name: user.name, email: user.email }, "secretkey");
                        res.cookie('auth-token', token); 
                        res.redirect("/users/dashboard");
                    } else {
                        return res.status(401).send("Incorrect password");
                    }
                });
            } else {
                return res.status(404).send("User not found");
            }
        }
    );
});


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
