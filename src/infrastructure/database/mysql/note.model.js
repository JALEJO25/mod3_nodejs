import { DataTypes } from "sequelize";
import { sequelize } from "./connection.js";

export const NoteModel = sequelize.define("Note", {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    imageUrl: { type: DataTypes.STRING },
    isPrivate: { type: DataTypes.BOOLEAN, defaultValue: false },
    password: { type: DataTypes.STRING },   
    userId: { type: DataTypes.STRING, allowNull: false },
// AGREGAMOS ESTO: La llave foránea
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permitimos notas sin categoría por ahora
        references: {
            model: 'categories', // Nombre de la tabla en MySQL
            key: 'id'
        }
    }    
}, { 
    tableName: 'Notes', // Forzamos el nombre de la tabla
    timestamps: true 
});

