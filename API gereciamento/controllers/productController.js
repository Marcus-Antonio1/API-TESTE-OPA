const Product = require("../models/Product");

// Objeto para as mensagens deixando mais facil para manutenção
const MESSAGES = {
  PRODUCT_NOT_FOUND: "O produto que você está bucando não foi encontrado, verifique as informações.",
  PRODUCT_CREATED: "Produto criado com sucesso.",
  PRODUCT_UPDATED: "Produto atualizado com sucesso.",
  PRODUCT_DELETED: "Produto deletado com sucesso.",
  SERVER_ERROR: "Erro, tente novamente mais tarde e verifique as informações.",
};

// Lista todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const populateCategories = req.query.populate === "true"; // Serve para permitir população condicional
    const products = populateCategories
      ? await Product.find().populate("categories")
      : await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Cria um novo produto
exports.createProduct = async (req, res) => {
  const { name, description, amount, price, categories } = req.body;
  try {
    const product = new Product({ name, description, amount, price, categories });
    await product.save();
    res.status(201).json({ message: MESSAGES.PRODUCT_CREATED, product });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Busca um produto por ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categories");
    if (!product) {
      return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Atualiza um produto por ID
exports.updateProduct = async (req, res) => {
  const { name, description, amount, price, categories } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, amount, price, categories },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
    }
    res.json({ message: MESSAGES.PRODUCT_UPDATED, product });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Deleta um produto por ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
    }
    res.json({ message: MESSAGES.PRODUCT_DELETED });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

