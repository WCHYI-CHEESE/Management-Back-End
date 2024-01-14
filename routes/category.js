const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let category = req.body;
    query = "insert into api_category (api_category_name) values(?)";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Category Added Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select * from api_category order by api_category_name ";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);

        }
        else {
            return res.status(500).json(err);
        }

    })
})

router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let api = req.body;
    var query = "update api_category set api_category_name=? where api_category_id=?";
    connection.query(query, [api.name, api.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Category id does not found" });
            }
            return res.status(200).json({ message: "Category updated successfully" });
        }
        else {
            return res.status(500).json(err);
        }

    })
})

module.exports = router;