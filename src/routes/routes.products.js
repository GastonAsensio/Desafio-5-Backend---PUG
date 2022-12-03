const express = require("express");
const productsRouter = express.Router();
const Manager = require("../manager.js");
const manager = new Manager("src/productFile.json");

productsRouter.get("/", async (req, res) => {
  const { message } = await manager.getAll();
  res.render("products", { message, subtitle: "Lista de Productos" });
});

productsRouter.post("/", async (req, res) => {
  await manager.createProduct(req.body);
  res.redirect("/");
});

productsRouter.get("/:id", async (req, res) => {
  res.send(await manager.getById(parseInt(req.params.id)));
});

productsRouter.put("/:id", async (req, res) => {
  res.send(await manager.modifyById(parseInt(req.params.id), req.body));
});

productsRouter.delete("/:id", async (req, res) => {
  res.send(await manager.deleteById(parseInt(req.params.id)));
});

module.exports = productsRouter;