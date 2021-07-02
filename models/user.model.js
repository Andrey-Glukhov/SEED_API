module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userId: Number, 
      username: String,
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      phone: String,
      userStatus: Number
     
    },
    { timestamps: true }
  );
  const AutoIncrement = require('mongoose-sequence')(mongoose);
  schema.plugin(AutoIncrement, { inc_field: 'userId' });

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
