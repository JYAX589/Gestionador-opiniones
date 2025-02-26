import Category from "./category.model.js";
import mongoose from "mongoose";
import { isAdmin } from "../middlewares/isAdmin.js";

export const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = new Category({
            name,
            createdBy: req.usuario._id 
        });

        await category.save();
        res.json({ category });

    } catch (error) {
        res.status(500).json({ msg: 'Error al crear la categoría', error });
    }
};


export const updateCategory = [isAdmin, async (req, res) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const categoryExists = await Category.findById(id);
        if (!categoryExists) {
            return res.status(404).json({ message: "Category not found" });
        }

        const categoryUpdate = await Category.findByIdAndUpdate(id, { name, description }, { new: true });

        res.status(200).json({
            message: "Category updated successfully",
            category: categoryUpdate
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}];


export const deleteCategory = [isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Verificar si hay publicaciones usando esta categoría
        const associatedPosts = await Post.findOne({ category: id });
        if (associatedPosts) {
            return res.status(400).json({ message: "Cannot delete category with associated posts" });
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}];

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};