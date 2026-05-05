import React from 'react';
import MedicoPages from './pages/medicoPages';
import PacientePages from './pages/PacientePages';
import AtendimentoPages from './pages/atendimentoPages';
import ReceitaPages from './pages/receitaPages';
import DashboardPages from './pages/dashboardPages';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/navbar';

const App = () => {
  return (
    <BrowserRouter>
    <MyNavbar />
    <Routes>
    <Route path='/medicos' element={<MedicoPages />}/>
    <Route path='/pacientes' element={<PacientePages />}/>
    <Route path='/atendimentos' element={<AtendimentoPages />}/>
    <Route path='/receitas' element={<ReceitaPages />}/>
    <Route path='/dashboard' element={<DashboardPages />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
