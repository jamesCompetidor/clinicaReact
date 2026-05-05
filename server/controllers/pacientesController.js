import pacienteServices from "../services/pacienteServices.js";

export const listar = async(req, res) => {
    const data = await pacienteServices.listar();

    res.json(data);
};

export const buscarPorId = async(req, res) => {
    const pacientes = await pacienteServices.buscarPorId(req.params.id);

    if(!pacientes) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json(pacientes);
};

export const criar = async(req, res) => {
    await pacienteServices.criar(req.body);

    res.json({mensage: "Paciente Criado com sucesso!"});
};

export const atualizar = async(req, res) => {
    const editar = await pacienteServices.atualizar(req.params.id, req.body);

    if(editar === 0) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json({mensage: "Paciente Atualizado com sucesso!"});
};

export const deletar = async(req, res) => {
    const deletado = await pacienteServices.deletar(req.params.id);

    if(deletado  === 0) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json({mensage: "Paciente Deletado com sucesso!"});
};



