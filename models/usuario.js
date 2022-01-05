const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "The name is requiered"],
  },
  email: {
    type: String,
    required: [true, "The email is requiered"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is requiered"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", usuarioSchema);
