import { Router } from "express";
import productController from "../controllers/product.controller.js";
// import ProductController from "../controllers/supplier.controller.js";
const router = new Router();

// router.post("/supplier", SupplierController.createSupplier);
router.get("/product", productController.getProducts);
// router.get("/supplier/:id", SupplierController.getOneSupplier);
// router.put("/supplier", SupplierController.updateSupplier);
// router.delete("/supplier/:id", SupplierController.deleteSupplier);

export default router;
