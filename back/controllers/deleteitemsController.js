import deleteItem from "../models/deleteItem.js"
import inventoryEntries from "../models/inventoryEntries.js"; 

// Delete  Inventory Item


export const deleteInventoryItem = async (req, res) => {
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

//     const inventoryCategory = await inventoryEntries.deleteMany({ category, name, qty, threshold, status});
//     res.status(200).json({ message: "Inventory deleted successfully", deleteInventoryItem: item });
//   } catch (error) {
//     console.error("Error deleting inventory:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
  

    const removedItem = inventoryCategory.items[itemIndex];

    inventoryCategory.items.splice(itemIndex, 1);
    await inventoryCategory.save();

    const newRemovedItem = new deleteItem({
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
