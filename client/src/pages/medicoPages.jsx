import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, Row, Col, Form, Card, Table } from 'react-bootstrap';

const MedicoPages = () => {

    const [medicos, setMedicos] = useState([]);

    const [form, setForm] = useState({
        nome: "",
        crm: "",
        especialidade: "",
        telefone: ""
    });

    const [editando, setEditando] = useState(null);

    const carregar = async() => {
        const res = await api.get("/medicos");

        setMedicos(res.data);
    };

    useEffect(() => {
        carregar();
    });

    const salvar = async() => {
        
        if(editando) {
            await api.put(`/medicos/${editando}`, form);
        } else {
            await api.post("/medicos", form);
        }

        setEditando(null)

        carregar();
    };

    const editar = async(medico) => {
        setForm({
        nome: medico.nome,
        crm: medico.crm,
        especialidade: medico.especialidade,
        telefone: medico.telefone
        });

        setEditando(medico.id);
    };

    const deletar = async(id) => {
        await api.delete(`/medicos/${id}`);

        carregar();
    };

  return (
    <div className='container mt-4'>
        <Card className='p-4 shadowing mt-4'> 
        <Form>

            <h2 className='fw-bold fs-1 mx-2 p-2'>Cadastro de médicos</h2>
      <Row className="mb-3">
        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome"
            value={form.nome}
            onChange={(e) => setForm({...form, nome: e.target.value})}
          />
        </Form.Group>

        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>CRM</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite seu CRM"
            value={form.crm}
            onChange={(e) => setForm({...form, crm: e.target.value})}
          />
        </Form.Group>

        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Especialidade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a especialidade"
            value={form.especialidade}
            onChange={(e) => setForm({...form, especialidade: e.target.value})}
          />
        </Form.Group>

        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite seu número de telefone"
            value={form.telefone}
            onChange={(e) => setForm({...form, telefone: e.target.value})}
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
          <th>Nome</th>
          <th>CRM</th>
          <th>Especialidade</th>
          <th>Telefone</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {medicos.map((medico) => (
            <tr key={medico.id}>
                <td>{medico.id}</td>
                <td>{medico.nome}</td>
                <td>{medico.crm}</td>
                <td>{medico.especialidade}</td>
                <td>{medico.telefone}</td>

                <td>
                    <button className='btn btn-warning sm me-2' onClick={() => editar(medico)}>Editar</button>
                    <button className='btn btn-danger sm ' onClick={() => deletar(medico.id)}>Excluir</button>
                </td>
            </tr>
        ))}
      </tbody>
    </Table>
    </Card>
      
    </div>
  )
}

export default MedicoPages
