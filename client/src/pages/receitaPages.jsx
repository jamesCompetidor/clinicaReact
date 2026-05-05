import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, Row, Col, Form, Card, Table } from 'react-bootstrap';

const ReceitaPages = () => {

    const [receitas, setReceitas] = useState([]);

    const [form, setForm] = useState({
        atendimento_id: "",
        descricao: "",
        data_receita: ""
    });

    const [editando, setEditando] = useState(null);

    const carregar = async() => {
        const res = await api.get("/receitas");

        setReceitas(res.data);
    };

    useEffect(() => {
        carregar();
    }, []);

    const salvar = async() => {
        
        if(editando) {
            await api.put(`/receitas/${editando}`, form);
        } else {
            await api.post("/receitas", form);
        }

        setEditando(null)

        carregar();
    };

    const editar = async(receita) => {
        setForm({
        atendimento_id: receita.atendimento_id,
        descricao: receita.descricao,
        data_receita: receita.data_receita,
        });

        setEditando(receita.id);
    };

    const deletar = async(id) => {
        await api.delete(`/receitas/${id}`);

        carregar();
    };

  return (
    <div className='container mt-4'>
        <Card className='p-4 shadowing mt-4'> 
        <Form>

<h2 className='fw-bold fs-1 mx-2 p-2'>Cadastro de receitas</h2>
      <Row className="mb-3">
        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Atendimento</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o id do atendimento"
            value={form.atendimento_id}
            onChange={(e) => setForm({...form, atendimento_id: e.target.value})}
          />
        </Form.Group>

        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            value={form.descricao}
            onChange={(e) => setForm({...form, descricao: e.target.value})}
          />
        </Form.Group>

        <Form.Group className='fs-5' as={Col} md="6">
          <Form.Label>Data Receita</Form.Label>
          <Form.Control
            type="date"
            value={form.data_receita}
            onChange={(e) => setForm({...form, data_receita: e.target.value})}
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
          <th>Atendimento</th>
          <th>Descrição</th>
          <th>Data da Receita</th>
          <th>Criado em</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {receitas.map((receita) => (
            <tr key={receita.id}>
                <td>{receita.id}</td>
                <td>{receita.medico_nome} - {receita.paciente_nome}</td>
                <td>{receita.descricao}</td>
                <td>{new Date(receita.data_receita).toLocaleDateString('pt-BR')}</td>
                <td>{new Date(receita.criado_em).toLocaleString('pt-BR')}</td>


                <td>
                    <button className='btn btn-warning sm me-2' onClick={() => editar(receita)}>Editar</button>
                    <button className='btn btn-danger sm ' onClick={() => deletar(receita.id)}>Excluir</button>
                </td>
            </tr>
        ))}
      </tbody>
    </Table>
    </Card>
      
    </div>
  )
}

export default ReceitaPages
