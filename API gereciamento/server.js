const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Importando e usando as rotas
const authRoutes = require("./routers/authRoutes"); 
const categoryRoutes = require("./routers/categoryRoutes");
const productRoutes = require("./routers/productRoutes"); 

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
