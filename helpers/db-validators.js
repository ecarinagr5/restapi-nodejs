const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en BD`);
  }
};

const emailIsValid = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya está registrado en BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no es válido`);
  }
};

module.exports = {
  esRolValido,
  emailIsValid,
  existeUsuarioPorId,
};
