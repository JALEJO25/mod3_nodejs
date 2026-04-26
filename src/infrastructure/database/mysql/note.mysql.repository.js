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
    

    async findByUserId(userId) {
        return await NoteModel.findAll({ where: { userId } });
    }
}