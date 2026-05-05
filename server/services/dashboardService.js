import db from "../config/db.js";

const listarResumo = async() => {
    const [[totalAtendimentos]] = await db.query("SELECT COUNT(*) as total FROM atendimentos");

    const [[totalPacientes]] = await db.query("SELECT COUNT(*) as total FROM pacientes ");

    const [[totalMedicos]] = await db.query("SELECT COUNT(*) as total from medicos");

    return {
        totalAtendimentos: totalAtendimentos.total,
        totalPacientes: totalPacientes.total,
        totalMedicos: totalMedicos.total
    };
};

export default { listarResumo };
