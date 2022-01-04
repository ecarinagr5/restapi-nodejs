const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const Role = require("../models/role");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("nombre", "Name is required").not().isEmpty(),
    check(
      "password",
      "Password is required and should have more than 6 letters"
    )
      .not()
      .isEmpty(),
    check("email", "Email is wrong").isEmail(),
    //check("rol", "Rol is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en BD`);
      }
    }),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
