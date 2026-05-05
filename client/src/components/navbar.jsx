import React from 'react';
import { Nav, Navbar, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className='p-3 shadowing fw-bold fs-2' as={ Link } to="/medicos">Hospital Senac Sm</Navbar.Brand>
          <Nav className="mt-2">
            <Nav.Link as={ Link } to="/medicos">Médicos</Nav.Link>
            <Nav.Link as={ Link } to="/pacientes">Pacientes</Nav.Link>
            <Nav.Link as={ Link } to="/atendimentos">Atendimentos</Nav.Link>
            <Nav.Link as={ Link } to="/receitas">Receitas</Nav.Link>
            <Nav.Link as={ Link } to="/dashboard">Dashboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default MyNavbar
