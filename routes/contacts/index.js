const contactsRouter = require("express").Router();

const contacts = require("../../controllers/contact.controller.js");

contactsRouter.get('/', contacts.findAll);
contactsRouter.get('/:id', contacts.findOne);
contactsRouter.post('/', contacts.create);
contactsRouter.put('/:id', contacts.update);
contactsRouter.delete('/:id', contacts.delete);

module.exports = contactsRouter;