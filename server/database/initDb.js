import db from "../config/db.js";

//medicos: nome, crm, especialidade, telefone
//pacientes: nome, data_nascimento, cpf, telefone
//atendimentos: medico_id, paciente_id, data_atendimento, observacoes
//receitas: atendimento_id, descricao, data_receita

export const initDb = async() => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS medicos (
        id int auto_increment primary key,
        nome varchar(100) not null,
        crm varchar(20) not null,
        especialidade varchar(100) not null,
        telefone varchar(20),
        criado_em timestamp default current_timestamp
        )`);

     db.query(`        
        CREATE TABLE IF NOT EXISTS pacientes (
        id int auto_increment primary key,
        nome varchar(100) not null,
        data_nascimento date not null,
        cpf varchar (14) not null,
        telefone varchar(20),
        criado_em timestamp default current_timestamp
        )`);

     db.query(`        
        CREATE TABLE IF NOT EXISTS atendimentos (
        id int auto_increment primary key,
        medicos_id int,
        pacientes_id int,
        data_atendimento datetime,
        observacoes text,
        criado_em timestamp default current_timestamp,

        foreign key (medicos_id) references medicos(id),
        foreign key (pacientes_id) references pacientes(id)
        )`);      
        

     db.query(`        
        CREATE TABLE IF NOT EXISTS receitas (
        id int auto_increment primary key,
        atendimentos_id int ,
        descricao text not null,
        data_receita date not null,
        criado_em timestamp default current_timestamp
        )`);   

}