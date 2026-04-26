// importante al trabajar con nuestros archivos debemos añadir al final .js requerido para ESM
import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async createNote(data) {
    if (!data.title || !data.content) {
      throw new Error("Title and content are required");
    }

    const note = new NoteEntity(data);

    return await this.noteRepository.save(note);
  }

  async getNoteById(id){
    const note= await this.noteRepository.getById(id);
    if(!note){
      throw new Error(`La nota con Id ${id} no existe`);
    }
    return note;
  }
}
