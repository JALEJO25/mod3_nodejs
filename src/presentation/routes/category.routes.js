import { Router } from 'express';
import { 
    handleCreateCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory 
} from '../controllers/category.controller.js';

const router = Router();

router.post('/', handleCreateCategory); // Ejercicio 1
router.get('/', getCategories);         // Listar todas
router.put('/:id', updateCategory);     // Editar
router.delete('/:id', deleteCategory);  // Borrar

export default router;