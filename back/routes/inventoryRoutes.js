import express from "express";
import {addInventory, getInventory, updateInventoryItem, issueInventory, getIssuedInventory} from "../controllers/inventoryController.js";
import deleteItem from "../models/deleteItem.js";

const router =express.Router();

router.post("/inventory", addInventory);
router.get("/getTable", getInventory);
router.put("/update-inventory", updateInventoryItem);
router.post("/issue-inventory", issueInventory); 
router.get("/getIssuedInventory", getIssuedInventory);
// router.delete("/delete-inventory",deleteInventoryItem);
router.get("/delete-inventory",deleteItem);


export default router;

