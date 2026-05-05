import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, Row, Col, Form, Card, Table } from 'react-bootstrap';

const AtendimentoPages = () => {

    const [atendimentos, setAtendimentos] = useState([]);

    const [form, setForm] = useState({
        medico_id: "",
        paciente_id: "",
        data_atendimento: "",
        observacoes: ""
    });

    const [editando, setEditando] = useState(null);

    const carregar = async() => {
        const res = await api.get("/atendimentos");

        setAtendimentos(res.data);
    };

    useEffect(() => {
        carregar();
    }, []);

    const salvar = async() => {
        
        if(editando) {
            await api.put(`/atendimentos/${editando}`, form);
        } else {
            await api.post("/atendimentos", form);
        }

        setEditando(null)

        carregar();
    };

    const editar = async(atendimento) => {
        setForm({
        medico_id: atendimento.medico_id,
        paciente_id: atendimento.paciente_id,
        data_atendimento: atendimento.data_atendimento,
        observacoes: atendimento.observacoes
        });

        setEditando(atendimento.id);
    };

    const deletar = async(id) => {
        await api.delete(`/atendimentos/${id}`);

        carregar();
    };

  return (
    <div className='container mt-4'>
        <Card className='p-4 shadowing mt-4'> 
        <Form>

            <h2 className='fw-bold fs-1 mx-2 p-2'>Cadastro de Atendimentos</h2>
      <Row className="mb-3">
        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Medico</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o id do médico"
            value={form.medico_id}
            onChange={(e) => setForm({...form, medico_id: e.target.value})}
          />
        </Form.Group>

        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Paciente</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o id do paciente"
            value={form.paciente_id}
            onChange={(e) => setForm({...form, paciente_id: e.target.value})}
          />
        </Form.Group>

        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Data de Atendimento do paciente</Form.Label>
          <Form.Control
            type="date"
            value={form.data_atendimento}
            onChange={(e) => setForm({...form, data_atendimento: e.target.value})}
          />
        </Form.Group>

        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite sua observação"
            value={form.observacoes}
            onChange={(e) => setForm({...form, observacoes: e.target.value})}
          />
        </Form.Group>        

      </Row>
      <Button className='btn btn-primary' onClick={salvar}> { editando ? "Atualizar" : "Salvar Cadastro"}</Button>
    </Form>
    </Card>

    <Card className='p-4 shadowing mt-4'>
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
                <td>{new Date(atendimento.data_atendimento).toLocaleString('pt-BR')}</td>
                <td>{atendimento.observacoes}</td>

                <td>
                    <button className='btn btn-warning sm me-2' onClick={() => editar(atendimento)}>Editar</button>
                    <button className='btn btn-danger sm ' onClick={() => deletar(atendimento.id)}>Excluir</button>
                </td>
            </tr>
        ))}
      </tbody>
    </Table>
    </Card>
      
    </div>
  )
}

export default AtendimentoPages
