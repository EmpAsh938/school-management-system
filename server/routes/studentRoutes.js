const express = require('express')
const router = express.Router()
const connection = require('../model/db')

router.route('/get/:cname')
.get((req, res) => {
    const {cname} = req.params
    if (!cname) {
        return res.status(400).json({
            "success": false,
            "message": "fields are empty",
            "body": []
        })
    }
    connection.query(`select * from students where classname='${cname}'`, (err, result) => {
        if(err) return res.status(500).json({
            "success": false,
            "message": err.message,
            "body": []
        })
        if(result.length < 1) return res.json({
            "success": false,
            "message": "students not found",
            "body": []
        })
        return res.status(200).json({
            "success": true,
            "message": "students recieved",
            "body": result
        })
    })
})

router.route('/create').post((req, res) => {
    const {sname, sclass, ssection, rollno} = req.body
    if (!sname || !sclass || !ssection || !rollno) {
        return res.status(400).json({
            "success": false,
            "message": "fields are empty",
            "body": []
        })
    }
    connection.query(`insert into students (sname, classname, section, rollno) values ('${sname}','${sclass}','${ssection}','${rollno}')`, (err, result) =>{
        if (err){
            return res.status(500).json({
                "su}ccess": false,
                "message": err.message,
                "body": []
            })
        }
        return res.status(201).json({
            "success": true,
            "message": "student created",
            "body": result
        })
    })
})

router.route('/update').put((req, res) => {
    const {sid, sname, sclass, ssection, rollno} = req.body
    if (!sid || !sname || !sclass || !ssection || !rollno) {
        return res.status(400).json({
            "success": false,
            "message": "fields are empty",
            "body": []
        })
    }
    connection.query(`update students set sname='${sname}',classname='${sclass}',section='${ssection}',rollno='${rollno}' where sid='${sid}'`, (err, result) => {
        if (err){
            return res.status(500).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        return res.status(200).json({
            "success": true,
            "message": "class updated",
            "body": result
        })
    })
})

router.route('/remove').delete((req, res) => {
    const {sid} = req.body
    if (!sid) {
        return res.status(400).json({
            "success": false,
            "message": "fields are empty",
            "body": []
        })
    }
    connection.query(`delete from students where sid='${sid}'`, (err, result) => {
        if (err){
            return res.status(500).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        return res.status(200).json({
            "success": true,
            "message": "student deleted",
            "body": result
        })
    })
})

module.exports = router