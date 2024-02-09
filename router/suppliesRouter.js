const express = require('express');
const router = express.Router();
const suppliesController = require('../controllers/suppliesController');


router.get('/', suppliesController.getAllSupplies);

router.get('/:supplyName', suppliesController.getSupplyByName);

router.post('/', suppliesController.createSupply);

router.put('/:supplyName', suppliesController.updateSupply);

router.delete('/:supplyName', suppliesController.deleteSupply);


module.exports = router;
