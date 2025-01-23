import express from "express";
import multer from "multer";
import path from "path";
import { MenuItem } from "../models/menuItem.js";
import fs from 'fs';
const router = express.Router();
import XLSX from 'xlsx';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/saveMenuItem", upload.single("image"), async (req, res) => {
  try {
    const { title, description, isVeg, halfPrice, fullPrice, category, prepTime } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newMenuItem = new MenuItem({
      title,
      description,
      image,
      isVeg: isVeg === "true",
      halfPrice,
      fullPrice,
      category,
      prepTime,
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    console.error("Error saving menu item:", error);
    res.status(500).json({ error: "Failed to save menu item" });
  }
});

router.get("/getMenuItems", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

router.delete("/deleteMenuItem/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const menuItem = await MenuItem.findById(id);
  
      if (!menuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }
  
      if (menuItem.image) {
        const imagePath = path.resolve("uploads", path.basename(menuItem.image.replace(/^\/+/, '')));
        fs.unlinkSync(imagePath);
      }
  
      await MenuItem.findByIdAndDelete(id);
      res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
      console.error("Error deleting menu item:", error);
      res.status(500).json({ error: "Failed to delete menu item" });
    }
  });
  
router.put("/updateMenuItem/:id", upload.single("image"), async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, isVeg, halfPrice, fullPrice, category, prepTime } = req.body;
  
      const menuItem = await MenuItem.findById(id);
  
      if (!menuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }
  
      menuItem.title = title || menuItem.title;
      menuItem.description = description || menuItem.description;
      menuItem.isVeg = isVeg === "true" ? true : menuItem.isVeg;
      menuItem.halfPrice = halfPrice || menuItem.halfPrice;
      menuItem.fullPrice = fullPrice || menuItem.fullPrice;
      menuItem.category = category || menuItem.category;
      menuItem.prepTime = prepTime || menuItem.prepTime;
  
      if (req.file) {
        if (menuItem.image) {
          const oldImagePath = path.resolve("uploads", path.basename(menuItem.image.replace(/^\/+/, "")));
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        menuItem.image = `/uploads/${req.file.filename}`;
      }
  
      const updatedMenuItem = await menuItem.save();
      res.status(200).json(updatedMenuItem);
    } catch (error) {
      console.error("Error updating menu item:", error);
      res.status(500).json({ error: "Failed to update menu item" });
    }
  });
  
  const fileUpload = multer({ dest: "fileUpload/" });
  
  router.post("/uploadExcel", fileUpload.single("file"), async (req, res) => {
    try {
      console.log('Request for excel came');
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const newItems = sheetData.map((row) => ({
        title: row.Title,
        description: row.Description,
        image: row.Image || null, 
        isVeg: row.IsVeg === "true",
        halfPrice: row.HalfPrice,
        fullPrice: row.FullPrice,
        category: row.Category,
        prepTime: row.PrepTime,
      }));
      console.log(newItems);
      const savedItems = await MenuItem.insertMany(newItems);
  
      res.json(savedItems);
    } catch (error) {
      console.error("Error processing Excel file:", error);
      res.status(500).json({ error: "Failed to process Excel file" });
    }
  });
    
export default router;
