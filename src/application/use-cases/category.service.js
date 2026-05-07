import { Category } from '../../infrastructure/database/mysql/category.model.js'; 

export const createCategory = async (categoryData) => {
    try {
        // Lógica para guardar en la base de datos usando el modelo de infraestructura
        const newCategory = await Category.create(categoryData);
        return newCategory;
    } catch (error) {
        throw new Error("Error al crear la categoría: " + error.message);
    }
};