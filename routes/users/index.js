const usersRouter = require("express").Router();
const users = require("../../controllers/user.controller.js");

usersRouter.get('/:id', users.findOne);
usersRouter.get('/', users.findAll);
usersRouter.post('/', users.create);
usersRouter.put('/:id', users.update);
usersRouter.delete('/:id', users.delete);

module.exports = usersRouter;