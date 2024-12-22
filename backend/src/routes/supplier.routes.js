import { Router } from "express";
import SupplierController from "../controllers/supplier.controller.js";
const router = new Router();

router.post("/supplier", SupplierController.createSupplier);
router.get("/supplier", SupplierController.getSuppliers);
router.get("/supplier/:id", SupplierController.getOneSupplier);
router.put("/supplier", SupplierController.updateSupplier);
router.delete("/supplier/:id", SupplierController.deleteSupplier);

export default router;
