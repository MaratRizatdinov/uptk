import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = new Router();

router.post("/product", productController.createProduct);
router.get("/product", productController.getProducts);
router.get("/product/:id", productController.getOneProduct);
router.put("/product", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

export default router;
