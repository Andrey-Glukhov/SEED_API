module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        contactId: Number,
        userId: String,
        prefix: String,
        firstName: String,
        middleName: String,
        lastName: String,
        nicknameName: String,
        photo: String,
        emailGroup: [{
          emailType: String,
          emailAddress: String 
        }],
        urlGroup:[{
          urlType: String,
          urlAddress: String,
          }],
        phoneGroup: [{
          phoneType: String,
          phoneNumber: String 
        }],
        addressGroup: [{
          addressType: String,
          streetAddress: String,
          addressLine2: String,
          city: String,
          state: String,
          postalCode: String,
          country:String,
          }],
        personalInfoGroup: String,
        birthday: String,
        anniversary: String,
        note: String
      },
      { timestamps: true }
    );
    
    const AutoIncrement = require('mongoose-sequence')(mongoose);
    schema.plugin(AutoIncrement, { inc_field: 'contactId' });

    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Contact = mongoose.model("contact", schema);
    return Contact;
  };
  