import medicoServices from "../services/medicoServices.js";

export const listar = async(req, res) => {
    const data = await medicoServices.listar();

    res.json(data);
};

export const buscarPorId = async(req, res) => {
    const medicos = await medicoServices.buscarPorId(req.params.id);

    if(!medicos) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json(medicos);
};

export const criar = async(req, res) => {
    await medicoServices.criar(req.body);

    res.json({mensage: "Médico Criado com sucesso!"});
};

export const atualizar = async(req, res) => {
    const editar = await medicoServices.atualizar(req.params.id, req.body);

    if(editar === 0) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json({mensage: "Médico Atualizado com sucesso!"});
};

export const deletar = async(req, res) => {
    const deletado = await medicoServices.deletar(req.params.id);

    if(deletado  === 0) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json({mensage: "Médico Deletado com sucesso!"});
};



