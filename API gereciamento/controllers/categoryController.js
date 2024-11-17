const Category = require("../models/Category");

// Objeto para as mensagens deixando mais facil para manutenção
const MESSAGES = {
  CATEGORY_NOT_FOUND: "A categoria que você busca não foi encontrada.",
  CATEGORY_CREATED: "Categoria criada com sucesso.",
  CATEGORY_UPDATED: "Categoria atualizada com sucesso.",
  CATEGORY_DELETED: "Categoria deletada com sucesso.",
  SERVER_ERROR: "Erro, tente novamente mais tarde e verifique as informações.",
};

// Listar todas as categorias
exports.getCategories = async (req, res) => {
  try {
    const populateProducts = req.query.populate === "true"; // Serve para permitir população condicional
    const categories = populateProducts
      ? await Category.find().populate("products")
      : await Category.find();

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Listar uma categoria por ID
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("products");
    if (!category) {
      return res.status(404).json({ message: MESSAGES.CATEGORY_NOT_FOUND });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Criar uma nova categoria
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ message: MESSAGES.CATEGORY_CREATED, category });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Atualizar uma categoria por ID
exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: MESSAGES.CATEGORY_NOT_FOUND });
    }
    res.json({ message: MESSAGES.CATEGORY_UPDATED, category });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Deletar uma categoria por ID
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: MESSAGES.CATEGORY_NOT_FOUND });
    }
    res.json({ message: MESSAGES.CATEGORY_DELETED });
  } catch (error) {
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

