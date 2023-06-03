const express = require("express");
const router = express.Router();
const connection = require("../db/database.js");
const bcrypt = require("bcrypt");
const { io } = require("../server");

router.get('/getallusers', (req, res) =>{
    connection.query(`SELECT * from rolling_acc`, (err, result, fields) =>{
        res.send(result);
    })
});

router.post('/delete', (req, res) =>{
    connection.query(`SELECT * from password`, (err, result, fields) =>{
        const {password} = req.body;

        bcrypt.compare(password, result[0].hashed, (err, result) =>{
            if (result === true) {
                connection.query(`TRUNCATE rolling_acc`);
                io.emit("acc");
                res.send("Semua data berhasil dihapus");
            } else {
                res.send("Password salah")
            }
        })
    })
    
})

router.post('/acc', (req, res) =>{
    const { name } = req.body;
    // connection.query(`INSERT INTO rolling_acc (id, name) VALUES ('', '${name}')`, (err, result, fields) =>{
    //     connection.query(`SELECT * from rolling_acc`, (err1, result1, fields1) =>{
    //         if (result1.length >= 36) {
    //             return io.emit("startRolling")
    //         }
            
    //         io.emit('acc', {name: name});
    //         const response = {
    //             res: "SUCCESS",
    //             code: 1
    //         }
    //         res.json(response);

    //     })
    // });
    
    connection.query(`SELECT * from rolling_acc`, (err, result, fields) =>{
        if (result.length >=35) {
            io.emit("startsRolling");
        }

        connection.query(`INSERT INTO rolling_acc (id, name) VALUES ('', '${name}')`);
        io.emit("acc");
        res.send("Successfully acced");
    });
    
});

module.exports = router;