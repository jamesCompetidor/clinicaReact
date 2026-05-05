import atendimentoService from "../services/atendimentoService.js";

export const listar = async(req, res) => {
    const data = await atendimentoService.listar();

    res.json(data);
};

export const buscarPorId = async(req, res) => {
    const atendimentos = await atendimentoService.buscarPorId(req.params.id);

    if(!atendimentos) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json(atendimentos);
};

export const criar = async(req, res) => {
    await atendimentoService.criar(req.body);

    res.json({mensage: "Atendimento Criado com sucesso!"});
};

export const atualizar = async(req, res) => {
    const editar = await atendimentoService.atualizar(req.params.id, req.body);

    if(editar === 0) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json({mensage: "Atendimento Atualizado com sucesso!"});
};

export const deletar = async(req, res) => {
    const deletado = await atendimentoService.deletar(req.params.id);

    if(deletado  === 0) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json({mensage: "Atendimento Deletado com sucesso!"});
};



