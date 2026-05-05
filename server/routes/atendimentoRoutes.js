import express from 'express';
import * as atendimentoControl from "../controllers/atendimentoControllers.js";

const atendimentoRoutes = express.Router();

atendimentoRoutes.get("/", atendimentoControl.listar)
atendimentoRoutes.get("/:id", atendimentoControl.buscarPorId)
atendimentoRoutes.post("/", atendimentoControl.criar)
atendimentoRoutes.put("/:id", atendimentoControl.atualizar)
atendimentoRoutes.delete("/:id", atendimentoControl.deletar)

export default atendimentoRoutes;