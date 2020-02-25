const express = require('express');
const router = express.Router();
const PageCollection = new (require('../collections/pageCollection'))();

router.post('/save_page', (req, res) => {
    debugger
    PageCollection.insertMany(req.body.components, (err, result) => {
        let return_data = {};
        if (err) {
            return_data.error_code = "0";
            return_data.error_description = "Something went wrong";
        } else {
            return_data.error_code = "1";
            return_data.error_description = "Success";
        }
        res.send(return_data);
    })
});

router.get('/get_pages', (req, res) => {
    PageCollection.find({}, (err, result) => {
        let return_data = {};
        if (err) {
            return_data.error_code = "0";
            return_data.error_description = "Something went wrong";
        } else {
            return_data.error_code = "1";
            return_data.error_description = "Success";
            return_data.data = result[1]
        }
        res.send(return_data);
    })
})

module.exports = router;