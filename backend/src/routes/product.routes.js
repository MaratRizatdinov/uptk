import { Router } from "express";
import productController from "../controllers/product.controller.js";
// import ProductController from "../controllers/supplier.controller.js";
const router = new Router();

// router.post("/supplier", SupplierController.createSupplier);
router.get("/product", productController.getProducts);
router.get("/product/:id", productController.getOneProduct);
router.put("/product", productController.updateProduct);
// router.delete("/supplier/:id", SupplierController.deleteSupplier);

export default router;
