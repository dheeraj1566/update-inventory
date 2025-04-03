import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid"; 
import inventoryEntries from "../models/inventoryEntries.js"; 
import removedInventory from "../models/removedINV.js";

export const addInventory = async (req, res) => {
  try {
    const { name, category, qty, threshold } = req.body;

    if (!name || !category || qty === undefined || threshold === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const status = qty > threshold ? "Available" : "Out of Stock";

    let existingCategory = await inventoryEntries.findOne({ category });

    if (existingCategory) {

      await inventoryEntries.updateOne(
        { category }, 
        { 
          $push: { items: { name, qty, threshold, status } }
        }
      );
      res.status(200).json({ message: "Item added to existing category" });
    } else {

      const newCategory = new inventoryEntries({
        category,
        items: [{ name, qty, threshold, status }],
      });

      await newCategory.save();
      res.status(201).json({ message: "New category created with item", newCategory });
    }
  } catch (error) {
    console.error("Error in addInventory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getInventory = async (req, res) => {
  try {
    const inventoryList = await inventoryEntries.find();
    res.status(200).json(inventoryList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Inventory Item
export const updateInventoryItem = async (req, res) => {
  try {
    const { category, name, qty, threshold, status } = req.body;

    if (!category || !name) {
      return res.status(400).json({ error: "Category and Item Name are required." });
    }
    const inventoryCategory = await inventoryEntries.findOne({ category });

    if (!inventoryCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    const item = inventoryCategory.items.find((item) => item.name === name);

    if (!item) {
      return res.status(404).json({ error: "Item not found in this category." });
    }

    item.qty = qty;
    item.threshold = threshold;
    item.status = status;

    await inventoryCategory.save();
    res.status(200).json({ message: "Inventory updated successfully", updatedItem: item });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// issueInventroy

export const issueInventory = async (req, res) => {
  try {
    const { category, itemName, issuedTo, issuedQty , returnable} = req.body;

    if (!category || !itemName || !issuedTo || issuedQty === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const inventory = await inventoryEntries.findOne({ category });

    if (!inventory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const item = inventory.items.find((i) => i.name === itemName);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.qty < issuedQty) {
      return res.status(400).json({ message: "Not enough stock available" });
    }


    item.qty -= issuedQty;

    inventory.issuedItems.push({
      itemName,
      issuedTo,
      issuedQty,
      returnable,
    });

    item.status = item.qty > item.threshold ? "Available" : "Out of Stock";

    await inventory.save();

    res.status(200).json({ message: "Item issued successfully!", inventory });
  } catch (error) {
    console.error("Error issuing inventory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// getIssuedInventory // 
export const getIssuedInventory = async (req, res) => {
  try 
  {
    const issuedInventory = await inventoryEntries.find({}, "category issuedItems");
    if (!issuedInventory || issuedInventory.length === 0) {
      return res.status(404).json({ message: "No issued inventory found." });
    }

    res.status(200).json(issuedInventory);
  } catch (error) {
    console.error("Error fetching issued inventory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// removedInventoryIteam  //

export const removeInventoryItem = async (req, res) => {
  try {
    const { category, itemName } = req.body;

    if (!category || !itemName) {
      return res.status(400).json({ message: "Category and Item Name are required." });
    }

    const inventoryCategory = await inventoryEntries.findOne({ category });

    if (!inventoryCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    const itemIndex = inventoryCategory.items.findIndex((item) => item.name === itemName);

  

    const removedItem = inventoryCategory.items[itemIndex];

    inventoryCategory.items.splice(itemIndex, 1);
    await inventoryCategory.save();

    const newRemovedItem = new removedInventory({
      itemName: removedItem.name,
      category: category,
      qty: removedItem.qty,
    });

    await newRemovedItem.save();

    res.status(200).json({ message: "Item removed successfully and stored in removed inventory!" });
  } catch (error) {
    console.error("Error removing inventory item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};