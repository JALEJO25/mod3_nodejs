import { Category } from './category.model.js'; // Asegúrate de que la ruta sea correcta

export const categoryRepository = {
    create: async (data) => {
        try {
            // Este es el comando que realmente guarda en la base de datos
            const newCategory = await Category.create(data);
            return newCategory;
        } catch (error) {
            throw new Error('Error en el repositorio: ' + error.message);
        }
    },
    
    
    // Obtener todas
    findAll: async () => await Category.findAll(),
    
    // Obtener una por ID
    findById: async (id) => await Category.findByPk(id),
    
    // Actualizar
    update: async (id, data) => {
        const category = await Category.findByPk(id);
        if (category) return await category.update(data);
        return null;
    },
    
    // Eliminar
    delete: async (id) => {
        const category = await Category.findByPk(id);
        if (category) return await category.destroy();
        return null;
    }
};