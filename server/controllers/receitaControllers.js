import receitaService from "../services/receitaServices.js";

export const listar = async(req, res) => {
    const data = await receitaService.listar();

    res.json(data);
};

export const buscarPorId = async(req, res) => {
    const receitas = await receitaService.buscarPorId(req.params.id);

    if(!receitas) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json(receitas);
};

export const criar = async(req, res) => {
    await receitaService.criar(req.body);

    res.json({mensage: "Receita Criada com sucesso!"});
};

export const atualizar = async(req, res) => {
    const editar = await receitaService.atualizar(req.params.id, req.body);

    if(editar === 0) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json({mensage: "Receita Atualizada com sucesso!"});
};

export const deletar = async(req, res) => {
    const deletado = await receitaService.deletar(req.params.id);

    if(deletado  === 0) {
        res.status(404).json({mensagem: "Não foi encontrado"})
    }

    res.json({mensage: "Receita Deletada com sucesso!"});
};



