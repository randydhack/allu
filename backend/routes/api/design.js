const express = require('express');
const router = express.Router();
const { Design } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//Most CRUD for desings can be added later again prioritize time on the features we have planned for frontend

//get all premade designs
router.get(
    '/',
    async (req, res) => {
        const designs = await Design.findAll({
            attributes: ['id', 'design_url', 'text_layers', 'design_price',]
        });
        if(!designs) {
            return res.status(500).json({error: 'Designs not found bad request'})
        }
        return res.json({"Designs": designs})
    }
)


//get a single premade design
router.get(
    '/:designId',
    async (req, res) => {
        const designs = await Design.findOne({
            where: {
                id: req.params.designId
            },
            attributes: ['id', 'design_url', 'text_layers', 'design_price',]
        });
        if(!designs) {
            return res.status(404).json({message: 'Design not found bad request', "statusCode": 404})
        }
        return res.json({"Designs": [designs]})
    }
)






module.exports = router;
