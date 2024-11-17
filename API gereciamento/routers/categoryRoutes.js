const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

// Middleware de validação de entrada
const validateCategory = [
  check("name", "O nome da categoria é obrigatório.").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.post("/", authMiddleware, validateCategory, categoryController.createCategory);
router.get("/", authMiddleware, categoryController.getCategories);
router.get("/:id", authMiddleware, categoryController.getCategory);
router.put("/:id", authMiddleware, validateCategory, categoryController.updateCategory);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;

