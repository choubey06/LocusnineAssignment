const { Client } = require('pg');
var connectionString = "postgres://postgres:admin@localhost:5432/postgres";

const client = new Client({
    connectionString: connectionString
});

client.connect();

exports.list = function (req, res) {

    client.query('SELECT * FROM users', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.send(JSON.stringify(result.rows));
    });

};

exports.getuser = function (req, res) {
    var id = req.body.id;
    client.query('SELECT * FROM users WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.send(JSON.stringify(result.rows));
    });

};



exports.add = function (req, res) {

    var cols = [req.body.name, req.body.email, req.body.role, req.body.mobile];
    client.query('INSERT INTO users("name", "email", "role", "mobile") VALUES($1, $2, $3, $4) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.redirect('/users');
    });

};

exports.update = function (req, res) {

    var cols = [req.body.id, req.body.name, req.body.email, req.body.role, req.body.mobile];
    client.query('UPDATE users SET name=$2, email=$3, role=$4, mobile=$5 WHERE id=$1', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.redirect('/users');
    });

};

exports.delete = function (req, res) {
    var id=req.body.id;
    client.query('DELETE FROM users WHERE id=$1', [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.redirect('/users');
    });

};