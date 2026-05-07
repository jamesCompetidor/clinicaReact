import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Button, Row, Col, Form, Card, Table } from "react-bootstrap";

const AtendimentoPages = () => {
  const [atendimentos, setAtendimentos] = useState([]);

  const [medicos, setMedicos] = useState([]);

  const [pacientes, setPacientes] = useState([]);

  const [form, setForm] = useState({
    medicos_id: "",
    pacientes_id: "",
    data_atendimento: "",
    observacoes: "",
  });

  const [editando, setEditando] = useState(null);

  const carregar = async () => {
    const res = await api.get("/atendimentos");

    setAtendimentos(res.data);
  };

  const carregarMédicos = async () => {
    const res = await api.get("/medicos");

    setMedicos(res.data);
  };

  const carregarPacientes = async () => {
    const res = await api.get("/pacientes");

    setPacientes(res.data);
  };

  useEffect(() => {
    carregar();
    carregarMédicos();
    carregarPacientes();
  }, []);

  const salvar = async () => {
    if (editando) {
      await api.put(`/atendimentos/${editando}`, form);
    } else {
      await api.post("/atendimentos", form);
    }

    setEditando(null);

    carregar();
  };

  const editar = async (atendimento) => {
    setForm({
      medicos_id: atendimento.medicos_id,
      pacientes_id: atendimento.pacientes_id,
      data_atendimento: atendimento.data_atendimento.slice(0, 16),
      observacoes: atendimento.observacoes,
    });

    setEditando(atendimento.id);
  };

  const deletar = async (id) => {
    await api.delete(`/atendimentos/${id}`);

    carregar();
  };

  return (
    <div className="container mt-4">
      <Card className="p-4 shadowing mt-4">
        <Form>
          <h2 className="fw-bold fs-1 mx-2 p-2">Cadastro de Atendimentos</h2>
          <Row className="mb-3">
            <Form.Group className="fs-5" as={Col} md="6">
              <Form.Label>Medico</Form.Label>
              <Form.Select
                value={form.medicos_id}
                onChange={(e) =>
                  setForm({ ...form, medicos_id: e.target.value })
                }
                aria-label="Default select example"
              >
                <option>Selecione o médico do atendimento</option>
                {medicos.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="fs-5" as={Col} md="6">
              <Form.Label>Paciente</Form.Label>
              <Form.Select value={form.pacientes_id} onChange={(e) => setForm({...form, pacientes_id: e.target.value})} aria-label="Default select example">
                <option>Selecione o paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="fs-5" as={Col} md="6">
              <Form.Label>Data de Atendimento do paciente</Form.Label>
              <Form.Control
                type="datetime-local"
                value={form.data_atendimento}
                onChange={(e) =>
                  setForm({ ...form, data_atendimento: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="fs-5" as={Col} md="6">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite sua observação"
                value={form.observacoes}
                onChange={(e) =>
                  setForm({ ...form, observacoes: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Button className="btn btn-primary" onClick={salvar}>
            {" "}
            {editando ? "Atualizar" : "Salvar Cadastro"}
          </Button>
        </Form>
      </Card>

      <Card className="p-4 shadowing mt-4">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Médico</th>
              <th>Paciente</th>
              <th>Data de Atendimento</th>
              <th>Observações</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {atendimentos.map((atendimento) => (
              <tr key={atendimento.id}>
                <td>{atendimento.id}</td>
                <td>{atendimento.medicos_nome}</td>
                <td>{atendimento.pacientes_nome}</td>
                <td>
                  {new Date(atendimento.data_atendimento).toLocaleString(
                    "pt-BR",
                  )}
                </td>
                <td>{atendimento.observacoes}</td>

                <td>
                  <button
                    className="btn btn-warning sm me-2"
                    onClick={() => editar(atendimento)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger sm "
                    onClick={() => deletar(atendimento.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default AtendimentoPages;
