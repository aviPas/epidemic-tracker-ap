const sqlite3 = require('sqlite3');
const express = require("express");
var app = express();

///const HTTP_PORT = 3000;
//app.listen(HTTP_PORT, () => {
 //  console.log("Server is listening on port " + HTTP_PORT);
//});
//function create_db() {

    const db = new sqlite3.Database('./countries_Data.db', (err) => {
        if (err) {
            console.error("Erro opening database " + err.message);
        } else {

            db.run('CREATE TABLE countriesData(\
            country NVARCHAR(20) PRIMARY KEY AUTOINCREMENT NOT NULL,\
            dateArrive  NVARCHAR(20),\
            dateLeav NVARCHAR(20),\
            jsonObj NVARCHAR(1000)\
        )', (err) => {
                if (err) {
                    console.log("Table already exists.");
                }
                let insert = 'INSERT INTO countriesData (country, dateArrive, dateLeav, jsonObj) VALUES (?,?,?,?)';
                db.run(insert, ["Chandan", "2021-02-01", "2021-02-03", "json"]);
                //console.log("Table created.");
            });
        }
    });
//}
