import express from "express";
import {addInventory, getInventory, updateInventoryItem, issueInventory, getIssuedInventory, removeInventoryItem, purchaseInventory ,restockInventory ,facultyrequestInventory} from "../controllers/inventoryController.js";

const router =express.Router();

router.post("/inventory", addInventory);
router.post("/purchase", purchaseInventory);
router.get("/getTable", getInventory);
router.put("/update-inventory", updateInventoryItem);
router.post("/issue-inventory", issueInventory); 
router.get("/getIssuedInventory", getIssuedInventory);
router.delete("/removeInventory", removeInventoryItem);
router.put("/restock-inventory", restockInventory);
router.post("/facultyrequestInventory", facultyrequestInventory);
// router.post("/facultyrequestInventory", facultyrequestInventory);

export default router;

