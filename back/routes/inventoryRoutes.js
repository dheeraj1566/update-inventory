import express from "express";
<<<<<<< HEAD
import {addInventory, getInventory, updateInventoryItem, issueInventory, getIssuedInventory} from "../controllers/inventoryController.js";
import { deleteInventoryItem } from "../controllers/deleteitemsController.js";

=======
import {addInventory, getInventory, updateInventoryItem, issueInventory, getIssuedInventory, removeInventoryItem} from "../controllers/inventoryController.js";
>>>>>>> eff4b7117d1397dbdb57a5a04be56db3bff708c1

const router =express.Router();

router.post("/inventory", addInventory);
router.get("/getTable", getInventory);
router.put("/update-inventory", updateInventoryItem);
router.post("/issue-inventory", issueInventory); 
router.get("/getIssuedInventory", getIssuedInventory);
<<<<<<< HEAD
// router.delete("/delete-inventory",deleteInventoryItem);
router.delete("/delete-inventory",deleteInventoryItem);
=======
router.delete("/removeInventory", removeInventoryItem);

<<<<<<< HEAD
=======
>>>>>>> eff4b7117d1397dbdb57a5a04be56db3bff708c1


>>>>>>> ea4f73a63abc9fd9fe9b466d7cf479922d3939de
export default router;

