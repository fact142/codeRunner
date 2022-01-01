const Router = require('express').Router
const codeController = require('./codeController')

const codeRouter = Router();
codeRouter.post('/', codeController.execute)

module.exports = codeRouter
