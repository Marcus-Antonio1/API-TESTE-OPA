const express = require("express");
const { check, validationResult } = require("express-validator");
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Middleware de validação de entrada
const validateProduct = [
  check("name", "O nome do produto é obrigatório.").notEmpty(),
  check("amount", "A quantidade é obrigatória e deve ser um número válido.").isNumeric(),
  check("price", "O preço é obrigatório e deve ser um número válido.").isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const router = express.Router();

router.get("/", authMiddleware, productController.getAllProducts);
router.get("/:id", authMiddleware, productController.getProduct);
router.post("/", authMiddleware, validateProduct, productController.createProduct);
router.put("/:id", authMiddleware, validateProduct, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
