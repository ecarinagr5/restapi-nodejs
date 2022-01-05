const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { emailIsValid } = require("../helpers/db-validators");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = async (req, res = response) => {
  //de preferencia usar esta estructura de abajo para controlar información sensible
  //creando la instancia new Usuario, solo va a mostrar la data que envien que este declarada en el modelo
  const { nombre, email, password, rol } = req.body;
  const usuario = new Usuario({ nombre, email, password, rol });

  //encryptar password
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  await usuario.save();

  res.json({
    msg: "post API - usuariosPost",
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  // TODO validar contra bd
  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    msg: "put API - usuariosPut",
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - usuariosDelete",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
