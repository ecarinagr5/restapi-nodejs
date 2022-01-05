const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRolValido,
  emailIsValid,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

//GET
router.get("/", usuariosGet);

//PUT
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

//POST
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
    check("email").custom(emailIsValid),
    //check("email", "Email is wrong").isEmail(),
    //check("rol", "Rol is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

//DELETE
router.delete("/", usuariosDelete);

//PATCH
router.patch("/", usuariosPatch);

module.exports = router;
