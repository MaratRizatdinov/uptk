import { Router } from "express";
import CustomerController from "../controllers/customer.controller.js";
const router = new Router();

router.post("/customer", CustomerController.createCustomer);
router.get("/customer", CustomerController.getCustomers);
router.get("/customer/:id", CustomerController.getOneCustomer);
router.put("/customer", CustomerController.updateCustomer);
router.delete("/customer/:id", CustomerController.deleteCustomer);

export default router;