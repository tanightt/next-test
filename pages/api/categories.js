import { connectToDatabase } from "../../utils/mongodb";
import express from "express";
import Joi from "joi";

const router = express.Router();

const categorySchema = Joi.object({
  name: Joi.string().required(),
  visibility: Joi.boolean().required(),
});

router.get("/api/categories", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const categories = await db.collection("categories").find().toArray();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Failed to GET categories:", error);
    res.status(500).json({ error: "Failed to GET categories" });
  }
});

router.post("/api/categories", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const newCategory = req.body;

    const { error } = categorySchema.validate(newCategory);

    if (error) {
      res.status(400).json({ error: "Invalid category data" });
      return;
    }

    const result = await db.collection("categories").insertOne(newCategory);
    const insertedId = result.insertedId;
    if (insertedId) {
      res.status(201).json({ _id: insertedId });
    }
  } catch (error) {
    console.error("Failed to POST category:", error);
    res.status(500).json({ error: "Failed to POST category" });
  }
});

router.put("/api/categories/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const categoryId = req.params.id;
    console.log("putID", categoryId);
    const updatedCategory = req.body;
    console.log("putUPPPP", updatedCategory);
    const result = await db
      .collection("categories")
      .updateOne({ _id: categoryId }, { $set: updatedCategory });
    console.log("put", result);
    res.status(200).json({ message: "Category updated" });
  } catch (error) {
    console.error("Failed to PUT category:", error);
    res.status(500).json({ error: "Failed to PUT category" });
  }
});

router.delete("/api/categories/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const categoryId = req.params.id;
    console.log("deleteID", categoryId);
    const result = await db
      .collection("categories")
      .deleteOne({ _id: categoryId });
    console.log("delete", result);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error("Failed to DELETE category:", error);
    res.status(500).json({ error: "Failed to DELETE category" });
  }
});

export default router;
