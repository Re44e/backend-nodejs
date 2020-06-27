import { Request, Response, json } from 'express'
import ServSaques from '../services/saque.serv'

class SaqueCtrl {
    
    // Função de acesso ao serviço de busca de configurações de saque.
    public async getAll (req: Request, res: Response): Promise<void> {
        await ServSaques.getAll()
        .then((reposta)=>{
            if(reposta.length > 0){
                return res.status(200).json(reposta)
            }else {
                return res.status(500).send({
                    message: 'Erro ao buscar configurações de saque.'
                });
            }
        }).catch((error) => {
            return `Erro: ${error}`
        })
    }

    // Função de acesso ao serviço de cadastro de configurações de saque.
    public async create (req: Request, res: Response): Promise<void> {
        await ServSaques.create(req.body)
        .then((resposta)=>{
            if(resposta){
                return res.status(200).send({
                    message: 'Configurações de saque cadastradas com sucesso.'
                })
            }else{
                return res.status(500).send({
                    message: 'Erro ao cadastrar configurações de saque.'
                });
            }
        }).catch((error) => {
            return `Erro: ${error}`
        })


    }
}

export default new SaqueCtrl();