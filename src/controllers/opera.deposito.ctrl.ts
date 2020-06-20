import { Request, Response, json } from 'express'
import OpDepositoServ from '../services/opera.deposito.serv'

class OpDepositoCtrl {

    // Função de acesso ao serviço de busca de operações de depósito.
    public async getAll (req: Request, res: Response): Promise<Response> {
        const depositos = await OpDepositoServ.getAll()
        return res.status(200).json(depositos)
    }

    // Função de acesso ao serviço de cadastro de operações de depósitos.
    public async create (req: Request, res: Response): Promise<Response> {
        const comprovanteDeposito = await OpDepositoServ.create(req.body)

        if(comprovanteDeposito == 2){
            return  res.status(401).send({
                message: 'Não foi possível realizar o depósito: Dados Inválidos.'
            });
        }

        if(comprovanteDeposito == true){
            return res.status(200).send({
                message: 'Depósito realizado com sucesso.'
            })
            

        }else if(comprovanteDeposito == false){
            return res.status(500).send({
                message: 'Falha ao emitir comprovante de depósito.'
            });
        }

        if(comprovanteDeposito == undefined) {
            return res.status(500).send({
                message: 'Falha ao realizar depósito.'
            });
        }
    }
}

export default new OpDepositoCtrl();