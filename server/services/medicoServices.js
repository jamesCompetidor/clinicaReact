import db from "../config/db.js";

const listar = async() => {
    const [rows] = await db.query("SELECT * FROM medicos");

    return rows;
};

const buscarPorId = async(id) => {
    const [rows] = await db.query("SELECT * FROM medicos WHERE id = ?", [id]);

    return rows[0];
};

const criar = async(medicos) => {
    await db.query("INSERT INTO medicos (nome, crm, especialidade, telefone) VALUES (?, ?, ?, ?)", [
        medicos.nome, medicos.crm, medicos.especialidade, medicos.telefone 
    ]);
};

const atualizar = async(id, medicos) => {
    const result = await db.query("UPDATE medicos SET nome = ?, crm = ?, especialidade = ?, telefone = ? WHERE id = ?", [
         medicos.nome, medicos.crm, medicos.especialidade, medicos.telefone, id]);

    return result.affectedRows;
};

const deletar = async(id) => {
    const result = await db.query("DELETE FROM medicos WHERE id = ?", [id]);

    return result.affectedRows;
};

export default { listar, buscarPorId, criar, atualizar, deletar};



