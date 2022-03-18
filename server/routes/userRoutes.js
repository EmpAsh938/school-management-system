const express = require('express')
const router = express.Router()
const connection = require('../model/db')

router.route('/get').post((req, res) => {
    const {email, password} = req.body
    connection.query(`select * from users where email='${email}' and password='${password}'`, (err, result) => {
        if (err) {
            return res.status(400).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        if (result.length === 0) {
            return res.status(401).json({
                "success": false,
                "message": "user not found",
                "body": []
            })
        }
        return res.status(200).json({
            "success": true,
            "message": "retrieved user",
            "body": result
        })
    })
})

router.route('/create').post((req, res) => {
    const {firstname, lastname, email, password} = req.body
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            "success": false,
            "message": "some fields are empty",
            "body": []
        })
    }
    connection.query(`insert into users(firstname, lastname, email, password) values (
        '${firstname}',
        '${lastname}',
        '${email}',
        '${password}'
    )`, (err, result) => {
        if (err) {
            return res.status(400).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        return res.status(201).json({
            "success": true,
            "message": "user created",
            "body": result
        })
    })
})

module.exports = router