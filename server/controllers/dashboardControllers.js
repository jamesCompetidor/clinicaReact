import dashboardService from "../services/dashboardService.js";

export const resumo = async(req, res) => {
    const data = await dashboardService.listarResumo();

    res.json(data);
};
