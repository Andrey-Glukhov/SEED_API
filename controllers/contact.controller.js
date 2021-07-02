const db = require("../models");
const Contact = db.contacts;

// Create and Save a new Contac
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({code: 1, message: "Content can not be empty!--"+ req.body });
    return;
  }

  // Create a Contact
  const contact = new Contact({
    contactId: req.body.contactId,  
    //userId: req.body.userId,      
    prefix: req.body.prefix,        
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    nicknameName: req.body.nicknameName,
    photo: req.body.photo,
    postalCode: req.body.postalCode,
    country: req.body.country,
    personalInfoGroup: req.body.personalInfoGroup,        
    birthday: req.body.birthday,        
    anniversary: req.body.anniversary,        
    note: req.body.note        
  });
  if (Array.isArray(req.body.emailGroup)) {
    contact.emailGroup = [... req.body.emailGroup];
  }
  if (Array.isArray(req.body.urlGroup)) {
    contact.urlGroup = [... req.body.urlGroup];
  }
  if (Array.isArray(req.body.phoneGroup)) {
    contact.phoneGroup = [... req.body.phoneGroup];
  }
  if (Array.isArray(req.body.addressGroup)) {
    contact.addressGroup = [... req.body.addressGroup];
  }

  // Save contact in the database
  contact
    .save(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};

// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
  Contact.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contacts."
      });
    });
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
  const contactID = req.params.contactID;

  Contact.findById(contactID)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Contact with contact ID =" + contactID });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Contact with contact ID =" + contactID });
    });
};

// Update a Contact by the contact ID in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const contactId = req.params.contactId;

  Contact.findByIdAndUpdate(contactId, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${contactId}. Maybe Contact was not found!`
        });
      } else res.send({ message: "Contact was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });
};

// Delete a Contact with the specified contact ID in the request
exports.delete = (req, res) => {
  const contactId = req.params.contactId;

  Contact.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${contactId}. Maybe Contact was not found!`
        });
      } else {
        res.send({
          message: "Contact was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with contact ID=" + contactId
      });
    });
};




