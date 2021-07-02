const companiesRouter = require("express").Router();

const companies = require("../../controllers/company.controller.js");

companiesRouter.get('/:id', companies.findOne);
companiesRouter.get('/', companies.findAll);
companiesRouter.post('/', companies.create);
companiesRouter.put('/:id', companies.update);
companiesRouter.delete('/:id', companies.delete);


module.exports = companiesRouter;