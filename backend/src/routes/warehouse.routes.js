import { Router } from "express";
import WarehouseController from "../controllers/warehouse.controller.js";
const router = new Router();

router.post("/warehouse", WarehouseController.createWarehouse);
router.get("/warehouse", WarehouseController.getWarehouses);
router.get("/warehouse/:id", WarehouseController.getOneWarehouse);
router.put("/warehouse", WarehouseController.updateWarehouse);
router.delete("/warehouse/:id", WarehouseController.deleteWarehouse);

export default router;
