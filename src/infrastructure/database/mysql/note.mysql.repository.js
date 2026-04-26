import NoteModel from "./note.model.js";

export default class NoteMySQLRepository {
    async save(noteEntity) {
        console.log("Intentando guardar en MySQL:", noteEntity);
          const note = await NoteModel.create({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            userId: noteEntity.userId,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password
        });
        return note.toJSON();
    }
    
    async getById(id) {
    const note = await NoteModel.findByPk(id);
    return note ? note.toJSON() : null;
    }
    
    async delete(id) {
    // Buscamos la nota para ver que existe
    const note = await NoteModel.findByPk(id);
    if (!note) return false;
    
    // Eliminamos el registro de la tabla
    await note.destroy();
    return true;
    }

    async update(id, updateData) {
    const note = await NoteModel.findByPk(id);
    if (!note) return null;

    // note.update(objeto) mezcla los datos viejos con los nuevos automáticamente
    await note.update(updateData);
    return note.toJSON();
}
    

    async findByUserId(userId) {
        return await NoteModel.findAll({ where: { userId } });
    }
}