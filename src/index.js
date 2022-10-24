"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();
var app = express();
var corsOptions = {
    origin: ["http://127.0.0.1:5173", "https://support.jontes.page"]
};
app.use(cors(corsOptions));
app.get("/users/:email", function (req, res) {
    if (fs.existsSync("users/" + req.params.email + ".json")) {
        var user = JSON.parse(fs.readFileSync("users/" + req.params.email + ".json", "utf8"));
        res.json({
            realname: user.name,
            subbeduntil: user.subbedUntil,
            plan: 'Obegränsad'
        });
    }
    else {
        res.status(404).json({ Error: "404 User Not Found!" });
    }
});
app.listen(process.env.PORT, function () {
    console.log("TypeScript with Express\n         http://localhost:" + process.env.PORT + "/");
});
