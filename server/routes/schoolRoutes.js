const express = require('express')
const router = express.Router()
const connection = require('../model/db')

// class operation (get, create, update, delete)
router.route('/class')
.get((req, res) => {
    connection.query('select classname from school_info', (err, result) => {
        if (err){
            return res.status(500).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        return res.status(200).json({
            "success": true,
            "message": "class recieved",
            "body": result
        })
    })
}).post((req, res) => {
    const {classname} = req.body
    if (!classname) {
        return res.status(400).json({
            "success": false,
            "message": "fields are empty",
            "body": []
        })
    }
    connection.query(`insert into school_info (classname, section) values ('${classname}', 'a')`, (err, result) =>{
        if (err){
            return res.status(500).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        return res.status(201).json({
            "success": true,
            "message": "class created",
            "body": result
        })
    })
}).put((req, res) => {
    const {oldclassname, newclassname} = req.body
    if (!oldclassname || !newclassname) {
        return res.status(400).json({
            "success": false,
            "message": "fields are empty",
            "body": []
        })
    }
    connection.query(`update school_info set classname='${newclassname}' where classname='${oldclassname}'`, (err, result) => {
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
}).delete((req, res) => {
    const {classname} = req.body
    if (!classname) {
        return res.status(400).json({
            "success": false,
            "message": "fields are empty",
            "body": []
        })
    }
    connection.query(`delete from school_info where classname='${classname}'`, (err, result) => {
        if (err){
            return res.status(500).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        return res.status(200).json({
            "success": true,
            "message": "class deleted",
            "body": result
        })
    })
})


// do all section operations (create, edit, delete)
router.route('/section').get((req, res) => {
    connection.query('select classname, section from school_info', (err, result) => {
        if (err){
            return res.status(500).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        return res.status(200).json({
            "success": true,
            "message": "class and section recieved",
            "body": result
        })
    })
}).post((req, res) => {
    const { classname, sections } = req.body
    if (!classname || !sections) {
        return res.status(400).json({
            "success": false,
            "message": "fields are empty",
            "body": []
        })
    }
    connection.query(`update school_info set section='${sections}' where classname='${classname}'`, (err, result) => {
        if (err){
            return res.status(500).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        return res.status(200).json({
            "success": true,
            "message": "section updated",
            "body": result
        })
    })
}).delete((req, res) => {
    const { classname, section } = req.body
    if (!classname || !section) {
        return res.status(400).json({
            "success": false,
            "message": "fields are empty",
            "body": []
        })
    }
    connection.query(`select section from school_info where classname='${classname}'`, (err, result) => {
        if (err){
            return res.status(500).json({
                "success": false,
                "message": err.message,
                "body": []
            })
        }
        if (result[0].section.length === 1) {
            connection.query(`delete from school_info where classname='${classname}'`, (error, results) => {
                if (error){
                    return res.status(500).json({
                        "success": false,
                        "message": err.message,
                        "body": []
                    })
                }
                return res.status(200).json({
                    "success": true,
                    "message": "class deleted",
                    "body": results
                })
            })
        } else {
            connection.query(`update school_info set section='${result[0].section.split(section).join('')}' where classname='${classname}'`, (error, results) => {
                if (error){
                    return res.status(500).json({
                        "success": false,
                        "message": err.message,
                        "body": []
                    })
                }
                return res.status(200).json({
                    "success": true,
                    "message": "section removed",
                    "body": results
                })
            })
        }
    })
})

module.exports = router;