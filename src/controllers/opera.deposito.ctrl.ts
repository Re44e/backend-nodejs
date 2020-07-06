import { Request, Response } from 'express'
import OpDepositoServ from '../services/opera.deposito.serv'

class OpDepositoCtrl {

    // Função de acesso ao serviço de busca de operações de depósito.
    public async getAll(req: Request, res: Response): Promise<any> {
        await OpDepositoServ.getAll()
        .then((resposta) =>{
            if (resposta.length > 0) {
                return res.status(200).json(resposta)
            } else {
                return res.status(500).send({
                    message: 'Nenhuma operação de depósito foi encontrada.'
                });
            }
        }).catch((error)=>{
            return `Erro: ${error}`
        })

     
    }

    // Função de acesso ao serviço de cadastro de operações de depósitos.
    public async create(req: Request, res: Response): Promise<any> {
        await OpDepositoServ.create(req.body)
            .then((resposta) => {
                switch (resposta) {
                    case 2:
                        return res.status(401).send({
                            message: 'Não foi possível realizar o depósito: Dados Inválidos.'
                        });
                    case true:
                        return res.status(200).send({
                            message: 'Depósito realizado com sucesso.'
                        })
                    case false:
                        return res.status(500).send({
                            message: 'Falha ao emitir comprovante de depósito.'
                        });
                    default:
                        return res.status(500).send({
                            message: 'Falha ao realizar depósito.'
                        });
                }
            }).catch((error) => {
                return `Erro: ${error}`
            })

    }
}
export default new OpDepositoCtrl();