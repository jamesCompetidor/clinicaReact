import db from "../config/db.js";

const listar = async() => {
    const [rows] = await db.query("SELECT * FROM pacientes");

    return rows;
};

const buscarPorId = async(id) => {
    const [rows] = await db.query("SELECT * FROM pacientes WHERE id = ?", [id]);

    return rows[0];
};

const criar = async(pacientes) => {
    await db.query("INSERT INTO pacientes (nome, data_nascimento, cpf, telefone) VALUES (?, ?, ?, ?)", [
        pacientes.nome, pacientes.data_nascimento, pacientes.cpf, pacientes.telefone 
    ]);
};

const atualizar = async(id, pacientes) => {
    const result = await db.query("UPDATE pacientes SET nome = ?, data_nascimento = ?, cpf = ?, telefone = ? WHERE id = ?", [
         pacientes.nome, pacientes.data_nascimento, pacientes.cpf, pacientes.telefone , id]);

    return result.affectedRows;
};

const deletar = async(id) => {
    const result = await db.query("DELETE FROM pacientes WHERE id = ?", [id]);

    return result.affectedRows;
};

export default { listar, buscarPorId, criar, atualizar, deletar};



