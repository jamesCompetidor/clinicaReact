import express from 'express';
import * as receitaControl from "../controllers/receitaControllers.js";

const receitaRoutes = express.Router();

receitaRoutes.get("/", receitaControl.listar)
receitaRoutes.get("/:id", receitaControl.buscarPorId)
receitaRoutes.post("/", receitaControl.criar)
receitaRoutes.put("/:id", receitaControl.atualizar)
receitaRoutes.delete("/:id", receitaControl.deletar)

export default receitaRoutes;