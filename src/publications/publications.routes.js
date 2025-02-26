import { Router } from "express";
import { getPublication, createPublication, updatePublication, deletePublication } from "./publications.controller.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { createComment, deleteComment, updatedComment } from "./comments.controller.js";

const router = Router();

router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('categoryId', 'Category is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty(),
        check('userId', 'Invalid user ID').isMongoId(),
        validarCampos
    ],
    createPublication
);

router.get('/', getPublication);
router.put('/:id', updatePublication);
router.delete('/:id', deletePublication);

// :id es el id de la publicacion
router.post('/:id/comments', createComment);
// :publicationId es el id de la publicacion y :commentId es el id del comentario
router.put('/:publicationId/comments/:commentId', updatedComment);
// :publicationId es el id de la publicacion y :commentId es el id del comentario
router.delete('/:publicationId/comments/:commentId', deleteComment);

export default router;