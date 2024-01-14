const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let apiCollection = req.body;
    query = "insert into api_collection (api_collection_name, api_category_id, description, object_id) values(?,?,?,?)";
    connection.query(query, [apiCollection.name, apiCollection.categoryId, apiCollection.description, apiCollection.objectId], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "API Collection Added Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select * from api_collection join api_category";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);

        }
        else {
            return res.status(500).json(err);
        }

    })
})

router.get('/getByCategory/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select api_collection_id, api_collection_name from api_collection where api_category_id =? ";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);

        }
        else {
            return res.status(500).json(err);
        }

    })
})

router.get('/getById/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select * from api_collection where api_collection_id=?";
    connection.query(query, [id], (err, results) => {
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
    var query = "update api_collection set api_collection_name=?, api_category_id=?, description=?, object_id=? where api_collection_id =?";
    connection.query(query, [api.name, api.id, api.categoryId, api.description, api.objectId], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "API Collection id does not found" });
            }
            return res.status(200).json({ message: "API Collection updated successfully" });
        }
        else {
            return res.status(500).json(err);
        }

    })
})

router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    const id = req.params.id;
    var query = "delete from api_collection where api_collection_id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "API Collection id does not found" });
            }
            return res.status(200).json({ message: "API Collection deleted successfully" });
        }
        else {
            return res.status(500).json(err);
        }

    })
})
module.exports = router;