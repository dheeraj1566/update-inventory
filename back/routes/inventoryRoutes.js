import express from "express";
import {addInventory, getInventory, updateInventoryItem, issueInventory, getIssuedInventory} from "../controllers/inventoryController.js";

const router =express.Router();

router.post("/inventory", addInventory);
router.get("/getTable", getInventory);
router.put("/update-inventory", updateInventoryItem);
router.post("/issue-inventory", issueInventory); 
router.get("/getIssuedInventory", getIssuedInventory);

export default router;

