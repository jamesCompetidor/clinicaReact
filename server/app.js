import express from "express";
import cors from "cors";

import medicoRoutes from "./routes/medicoRoutes.js";
import pacientesRoutes from "./routes/pacienteRoutes.js";
import atendimentoRoutes from "./routes/atendimentoRoutes.js";
import receitaRoutes from "./routes/receitaRoutes.js";
import dashRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

//ROTAS
app.use("/medicos", medicoRoutes);
app.use("/pacientes", pacientesRoutes);
app.use("/atendimentos", atendimentoRoutes);
app.use("/receitas", receitaRoutes);
app.use("/dashboard", dashRoutes);

export default app;