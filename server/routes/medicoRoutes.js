import express from 'express';
import * as medicoControl from "../controllers/medicoControllers.js";

const medicosRoutes = express.Router();

medicosRoutes.get("/", medicoControl.listar)
medicosRoutes.get("/:id", medicoControl.buscarPorId)
medicosRoutes.post("/", medicoControl.criar)
medicosRoutes.put("/:id", medicoControl.atualizar)
medicosRoutes.delete("/:id", medicoControl.deletar)

export default medicosRoutes;