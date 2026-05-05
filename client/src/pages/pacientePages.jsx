import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, Row, Col, Form, Card, Table } from 'react-bootstrap';

const PacientePages = () => {

    const [pacientes, setPacientes] = useState([]);

    const [form, setForm] = useState({
        nome: "",
        data_nascimento: "",
        cpf: "",
        telefone: ""
    });

    const [editando, setEditando] = useState(null);

    const carregar = async() => {
        const res = await api.get("/pacientes");

        setPacientes(res.data);
    };

    useEffect(() => {
        carregar();
    });

    const salvar = async() => {
        
        if(editando) {
            await api.put(`/pacientes/${editando}`, form);
        } else {
            await api.post("/pacientes", form);
        }

        setEditando(null)

        carregar();
    };

    const editar = async(paciente) => {
        setForm({
        nome: paciente.nome,
        data_nascimento: paciente.data_nascimento,
        cpf: paciente.cpf,
        telefone: paciente.telefone
        });

        setEditando(paciente.id);
    };

    const deletar = async(id) => {
        await api.delete(`/pacientes/${id}`);

        carregar();
    };

  return (
    <div className='container mt-4'>
        <Card className='p-4 shadowing mt-4'> 
        <Form>

            <h2 className='fw-bold fs-1 mx-2 p-2'>Cadastro de pacientes</h2>
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
          <Form.Label>Data Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={form.data_nascimento}
            onChange={(e) => setForm({...form, data_nascimento: e.target.value})}
          />
        </Form.Group>

        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite seu CPF"
            value={form.cpf}
            onChange={(e) => setForm({...form, cpf: e.target.value})}
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
          <th>Data de Nascimento</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((paciente) => (
            <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.nome}</td>
                <td>{new Date(paciente.data_nascimento).toLocaleDateString('pt-BR')}</td>
                <td>{paciente.cpf}</td>
                <td>{paciente.telefone}</td>

                <td>
                    <button className='btn btn-warning sm me-2' onClick={() => editar(paciente)}>Editar</button>
                    <button className='btn btn-danger sm ' onClick={() => deletar(paciente.id)}>Excluir</button>
                </td>
            </tr>
        ))}
      </tbody>
    </Table>
    </Card>
      
    </div>
  )
}

export default PacientePages
