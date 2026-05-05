import db from "../config/db.js";

const listar = async() => {
    const [rows] = await db.query(
    `     SELECT 
            r.id,
            r.atendimento_id,
            r.descricao,
            r.data_receita,
            m.nome AS medico_nome,
            p.nome AS paciente_nome
        FROM receitas r
        JOIN atendimentos a ON r.atendimento_id = a.id
        JOIN medicos m ON a.medicos_id = m.id
        JOIN pacientes p ON a.pacientes_id = p.id
    `
    );

    return rows;
};

const buscarPorId = async(id) => {
    const [rows] = await db.query("SELECT * FROM receitas WHERE id = ?", [id]);

    return rows[0];
};

const criar = async(receitas) => {
    await db.query("INSERT INTO receitas (atendimento_id, descricao, data_receita) VALUES (?, ?, ?)", [
        receitas.atendimento_id, receitas.descricao, receitas.data_receita
    ]);
};

const atualizar = async(id, receitas) => {
    const result = await db.query("UPDATE receitas SET atendimento_id = ?, descricao = ?,  data_receita = ? WHERE id = ?", [
         receitas.atendimento_id, receitas.descricao, receitas.data_receita, id]);

    return result.affectedRows;
};

const deletar = async(id) => {
    const result = await db.query("DELETE FROM receitas WHERE id = ?", [id]);

    return result.affectedRows;
};

export default { listar, buscarPorId, criar, atualizar, deletar};



