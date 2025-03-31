import deleteItems from "../models/deleteItem";

// Delete  Inventory Item
export const deleteItem = async (req, res) => {
    try {
      const { category, name,qty   } = req.body;
  
      const inventory = await inventoryEntries.findOne({ category });
      
  
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
     
  
      // Deduct the quantity from stock
      item.qty -= deleteQty;
    

    res.status(200).json({ message: "Item delete successfully!", inventory });
    }catch (error) {
  console.error("Error deleting inventory:", error);
  res.status(500).json({ message: "Server error", error: error.message });
}
}

