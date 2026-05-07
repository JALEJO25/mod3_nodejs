import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
import  upload  from "../middlewares/upload.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

import { getPublicNote} from '../controllers/note.controller.js';

//aqui definiremos que base de datos usar para las notas, en este caso MongoDB
import NoteMongoRepository from "../../infrastructure/database/mongo/note.mongo.repository.js";
import NoteMysqlRepository from "../../infrastructure/database/mysql/note.mysql.repository.js";

// inyeccion de dependencias
//const noteRepository = new NoteMongoRepository();
const noteRepository = new NoteMysqlRepository();

const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

const router = Router();

//definir las rutas para las notas 
router.post("/", upload.single('image'), noteController.createNote);
router.get("/:id", noteController.getById);


router.delete('/:id', authMiddleware, noteController.delete);
router.put('/:id', authMiddleware, upload.single('image'), noteController.update);

router.get('/:id/public', getPublicNote);

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Gestión avanzada de notas con imágenes y roles / by Joel Alejo
 */

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Crear una nueva nota con imagen
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mi Tarea de Node.js"
 *               content:
 *                 type: string
 *                 example: "Finalizar la documentación de Swagger hoy."
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Nota creada exitosamente
 */
router.post("/", authMiddleware, noteController.createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Obtener todas las notas del usuario (MySQL)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas obtenida exitosamente
 */
router.get("/", authMiddleware, noteController.getNotesByUserId);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Eliminar una nota (Solo Admins)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nota eliminada
 *       403:
 *         description: Acceso denegado (Requiere admin)
 */




export default router;

