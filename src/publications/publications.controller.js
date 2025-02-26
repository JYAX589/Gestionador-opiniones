import Publication from './publications.model.js';
import User from '../users/user.model.js';
import Category from '../category/category.model.js';
import mongoose from 'mongoose';

export const createPublication = async (req, res) => {
    try {
        console.log('req.body:', req.body);

        const { title, categoryId, content, userId } = req.body;

        // Validar que userId y categoryId son ObjectId válidos
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verificar que la categoría existe y fue creada por un ADMIN_ROLE
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const adminUser = await User.findById(category.createdBy);
        if (!adminUser || adminUser.role !== 'ADMIN_ROLE') {
            return res.status(403).json({ message: 'You can only use categories created by an admin' });
        }

        const newPublication = new Publication({
            title,
            category: categoryId,
            content,
            user: userId,
        });

        await newPublication.save();
        res.status(201).json(newPublication);
    } catch (error) {
        console.error('Error creating publication:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getPublication = async (req, res) => {
    try {
        const publications = await Publication.find()
            .populate('user', 'name username')
            .populate('category', 'name');
        res.json(publications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, categoryId, content } = req.body;

        if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            { title, category: categoryId, content },
            { new: true }
        );

        if (!updatedPublication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        res.json(updatedPublication);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findByIdAndDelete(id);

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        res.json({ message: 'Publication deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
