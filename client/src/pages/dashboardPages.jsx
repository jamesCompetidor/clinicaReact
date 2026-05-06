import React from 'react'
import api from '../services/api';
import { useState, useEffect } from 'react';
import {Row, Card, Col} from 'react-bootstrap';
import { BsCapsule } from "react-icons/bs";
import { BsEmojiTearFill } from "react-icons/bs";
import { BsFillEnvelopeArrowDownFill } from "react-icons/bs";



const DashboardPages = () => {

    const [dados, setDados] = useState({
        totalMedicos: 0,
        totalPacientes: 0,
        totalAtendimentos: 0
    });

    const carregar = async() => {
        const res = await api.get("/dashboard");

        setDados(res.data);
    };

    useEffect(() => {
        carregar();
    });


  return (
      <Card className="text-center">
      <Row className='g-4 mt-3'>

      <h2  className='fw-bold fs-1 shadow-sm '>Dashboard</h2>

        <Col md={4}>
         <Card className='shadow-sm border-0 rounded-4 text-center p-3 card-dashboard text-bg-success'>
         <BsCapsule size={44} className='d-block mx-auto mb-4'/> 
        <h6 className='card-text'>Médicos</h6>
        <h2 className='fw-bold text-warning'>{dados.totalMedicos}</h2>
        </Card>
        </Col>

        <Col md={4}>
         <Card  className='shadow-sm border-0 rounded-4 text-center p-3 card-dashboard text-bg-primary'>
          <BsEmojiTearFill size={44}className='d-block mx-auto mb-4'/>
            <h6 className='card-text'>Pacientes</h6>
            <h2 className='fw-bold text-warning'>{dados.totalPacientes}</h2>
         </Card>
        </Col>

        <Col md={4}>
         <Card className='shadow-sm border-0 rounded-4 text-center p-3 card-dashboard text-bg-danger'>
          <BsFillEnvelopeArrowDownFill size={44} className='d-block mx-auto mb-4'/>
            <h6 className='card-text'>Atendimentos</h6>
            <h2 className='fw-bold text-warning'>{dados.totalAtendimentos}</h2>
        </Card>
        </Col>

      </Row>
    </Card>
  )
}

export default DashboardPages;

