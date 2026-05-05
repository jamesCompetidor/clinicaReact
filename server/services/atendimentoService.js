import db from "../config/db.js";

const listar = async () => {
  const [rows] = await db.query(`
    SELECT 
    a.id,
    a.medicos_id,
    a.pacientes_id,
    m.nome AS medicos_nome,
    p.nome AS pacientes_nome,
    a.data_atendimento,
    a.observacoes
    FROM atendimentos a
    JOIN medicos m ON a.medicos_id = m.id
    JOIN pacientes p ON a.pacientes_id = p.id `);

  return rows;
};

const buscarPorId = async (id) => {
  const [rows] = await db.query(`SELECT * FROM atendimentos WHERE id = ?`, [
    id,
  ]);

  return rows[0];
};

const criar = async (atendimentos) => {
  await db.query(
    "INSERT INTO atendimentos (medicos_id, pacientes_id, data_atendimento, observacoes) VALUES (?, ?, ?, ?)",
    [
      atendimentos.medico_id,
      atendimentos.paciente_id,
      atendimentos.data_atendimento,
      atendimentos.observacoes,
    ],
  );
};

const atualizar = async (id, atendimentos) => {
  const result = await db.query(
    "UPDATE atendimentos SET medicos_id = ?, pacientes_id = ?, data_atendimento = ?, observacoes = ? WHERE id = ?",
    [
      atendimentos.medico_id,
      atendimentos.paciente_id,
      atendimentos.data_atendimento,
      atendimentos.observacoes,
      id,
    ],
  );

  return result.affectedRows;
};

const deletar = async (id) => {
  const result = await db.query("DELETE FROM atendimentos WHERE id = ?", [id]);

  return result.affectedRows;
};

export default { listar, buscarPorId, criar, atualizar, deletar };
