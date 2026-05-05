import express from 'express';
import * as dashboardControl from "../controllers/dashboardControllers.js";

const dashRoutes = express.Router();

dashRoutes.get("/", dashboardControl.resumo);

export default dashRoutes;
