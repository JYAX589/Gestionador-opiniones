import express from 'express';
import { createCategory, updateCategory, deleteCategory, getCategory } from './category.controller.js';
import {isAdmin} from "../middlewares/isAdmin.js";
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = express.Router();

router.post('/', validarJWT, isAdmin, createCategory);
router.put('/:id', validarJWT, isAdmin, updateCategory);
router.delete('/:id', validarJWT, isAdmin, deleteCategory);
router.get('/', getCategory);


export default router;