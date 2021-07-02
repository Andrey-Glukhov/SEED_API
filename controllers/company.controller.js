const db = require("../models");
const Company = db.companies;

// Create and Save a new company

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({code: 1, message: "Content can not be empty!--"+ req.body });
    return;
  }

  // Create a Company
  const company = new Company({
    companyId: req.body.companyId,
    userId: req.body.userId, 
    name: req.body.name,
    logo: req.body.logo,
    category: req.body.category
  });
  if (Array.isArray(req.body.emailGroup)) {
    company.emailGroup = [... req.body.emailGroup];
  }
  if (Array.isArray(req.body.urlGroup)) {
    company.urlGroup = [... req.body.urlGroup];
  }
  if (Array.isArray(req.body.phoneGroup)) {
    company.phoneGroup = [... req.body.phoneGroup];
  }
  if (Array.isArray(req.body.addressGroup)) {
    company.addressGroup = [... req.body.addressGroup];
  }

  // Save Company in the database
  company
    .save(company)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    });
};

// Retrieve all companies from the database.
exports.findAll = (req, res) => {
  Company.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies."
      });
    });
};

// Find a single company with an id
exports.findOne = (req, res) => {
  const companyId = req.params.companyId;

  company.findById(companyId)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found company with ID " + companyId });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving company with ID =" + companyId });
    });
};

// Update a company  by the company id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const companyId = req.params.companyId;

  User.findByIdAndUpdate(companyId, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update company with id=${companyId}. Maybe company was not found!`
        });
      } else res.send({ message: "Company was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating company with id=" + id
      });
    });
};

// Delete a User with the specified username in the request
exports.delete = (req, res) => {
  const companyId = req.params.companyId;

  Company.findByIdAndRemove(companyId, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete company with id=${companyId}. Maybe company was not found!`
        });
      } else {
        res.send({
          message: "Company was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete company with company ID=" + companyId
      });
    });
};




