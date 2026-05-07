import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,{
        host: process.env.MYSQL_HOST,
        dialect: "mysql",
    });     
    
    export const connectMysql = async () => {
        try {

            // Importación dinámica para romper la circularidad
        const { NoteModel } = await import('./note.model.js');
        const { Category } = await import('./category.model.js');

        // Configurar relaciones aquí mismo
        Category.hasMany(NoteModel, { foreignKey: 'categoryId', as: 'notes' });
        NoteModel.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

            await sequelize.authenticate(); 
            await sequelize.sync({alter: true});
            console.log('Connected to MySQL');
        } catch (error) {
            console.error('Error connecting to MySQL:', error);
            process.exit(1);
        }
    };
    
    export { sequelize };
