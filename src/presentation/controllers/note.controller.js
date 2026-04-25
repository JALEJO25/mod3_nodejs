export default class NoteController {
  constructor(noteService) {
    this.noteService = noteService;
  }

  createNote = async (req, res) => {
    // 1. Extraemos los datos del cuerpo
    const { title, content, isPrivate, password } = req.body;

    // 2. Construimos el objeto de datos con los nombres EXACTOS del modelo
    const noteData = {
      title,
      content,
      isPrivate: isPrivate === 'true', // Convertimos el string de form-data a booleano
      password,
      userId: "user_123", // El campo que Mongoose te reclama
    };

    // 3. Si hay un archivo, usamos el nombre correcto: imageUrl (con U mayúscula)
    if (req.file) {
      noteData.imageUrl = "/uploads/" + req.file.filename;
    }

    try {
      // 4. Enviamos el objeto limpio al servicio
      const note = await this.noteService.createNote(noteData);
      res.status(201).json(note);
    } catch (error) {
    console.log("DETALLE DEL ERROR:", error); // Esto imprimirá el objeto de error completo
    res.status(400).json({ error: error.message });
}
};

  getNotesByUserId = async (req, res) => {
    const userId = "user_123";

    try {
      const notes = await this.noteService.getNotesByUserId(userId);

      res.status(200).json(notes); // 200 OK
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
}
