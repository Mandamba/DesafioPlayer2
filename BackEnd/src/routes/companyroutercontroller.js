const express = require('express')
const CompanyController = require('../controllers/registercompanycontroller') 
const checkAuthMiddleware = require('../middleware/check-Auth')
const router = express.Router()

router.post('/', CompanyController.CreateCompany)
router.get('/:id', checkAuthMiddleware.checkAuth, CompanyController.show)
router.get('/', checkAuthMiddleware.checkAuth, CompanyController.index)
router.put('/:id', checkAuthMiddleware.checkAuth,  CompanyController.empresaAtualizada)
router.delete('/:id', checkAuthMiddleware.checkAuth, CompanyController.destroy)

module.exports = router