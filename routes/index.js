module.exports = (app) => {
    //console.log(app);
    app.use('/seedapp/users', require('./users'));
    app.use('/seedapp/contacts', require('./contacts'));
    app.use('/seedapp/companies', require('./companies'));
  
    
  };
  