import { categoryRepository } from '../../infrastructure/database/mysql/category.mysql.repository.js';

/**
 * Crea una nueva categoría
 */
export const handleCreateCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Validamos que el nombre llegue en el body de Postman
        if (!name) {
            return res.status(400).json({ message: "El nombre es obligatorio" });
        }

        // LLAMADA AL REPOSITORIO (Donde ocurre la magia en MySQL)
        const newCategory = await categoryRepository.create({ name });

        // Retornamos el objeto con el ID generado por MySQL
        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json({ 
            message: "Error al crear la categoría",
            error: error.message 
        });
    }
};

// LISTAR TODO
export const getCategories = async (req, res) => {
    try {
        const categories = await categoryRepository.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ACTUALIZAR
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await categoryRepository.update(id, req.body);
        if (!updated) return res.status(404).json({ message: "Categoría no encontrada" });
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ELIMINAR
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await categoryRepository.delete(id);
        if (!deleted) return res.status(404).json({ message: "Categoría no encontrada" });
        return res.status(200).json({ message: "Categoría eliminada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};