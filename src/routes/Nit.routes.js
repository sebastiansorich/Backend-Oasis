const express = require('express');
const router = express.Router();
const nitController = require('../controllers/NIT.controllers');

router.get('/', nitController.getAllNITs);
router.get('/:nit', nitController.getNITById);
router.post('/', nitController.createNIT);
router.put('/:nit', nitController.updateNIT);
router.delete('/:nit', nitController.deleteNIT);

module.exports = router;
