module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        companyId:Number,
        name: String,
        logo: String, 
        emailAddress: String,
        phoneNumber: String,
        addressGroup: [{
          addressType: String,
          streetAddress: String,
          addressLine2: String,
          city: String,
          state: String,
          postalCode: String,
          country:String,
          }],
        urlGroup:[{
          urlType: String,
          urlAddress: String,
          }],
        category: String        
      },
      { timestamps: true }
    );
    
    const AutoIncrement = require('mongoose-sequence')(mongoose);
    schema.plugin(AutoIncrement, { inc_field: 'companyId' });

    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Company = mongoose.model("company", schema);
    return Company;
  };
  