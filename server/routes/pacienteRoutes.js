import express from 'express';
import * as pacientesControl from '../controllers/pacientesController.js';

const pacientesRoutes = express.Router();

pacientesRoutes.get("/", pacientesControl.listar)
pacientesRoutes.get("/:id", pacientesControl.buscarPorId)
pacientesRoutes.post("/", pacientesControl.criar)
pacientesRoutes.put("/:id", pacientesControl.atualizar)
pacientesRoutes.delete("/:id", pacientesControl.deletar)

export default pacientesRoutes;