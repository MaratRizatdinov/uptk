import { Router } from "express";
import initDocControllers from "../controllers/initDoc.controllers.js";

const router = new Router();

router.post("/init_doc", initDocControllers.createInitDoc);
router.get("/init_doc", initDocControllers.getInitDocAll);
// router.get("/customer/:id", CustomerController.getOneCustomer);
// router.put("/customer", CustomerController.updateCustomer);
// router.delete("/customer/:id", CustomerController.deleteCustomer);

export default router;