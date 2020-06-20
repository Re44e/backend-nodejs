import { Request, Response, json } from 'express'
import OpDepositoServ from '../services/opera.deposito.serv'

class OpDepositoCtrl {

    // Função para serviço de busca de operações de depósito.
    public async getAll (req: Request, res: Response): Promise<Response> {
        const depositos = await OpDepositoServ.getAll()
        return res.status(200).json(depositos)
    }

    // Função para serviço de cadastro de operações de depósitos.
    public async create (req: Request, res: Response): Promise<Response> {
        const comprovanteDeposito = await OpDepositoServ.create(req.body)

        if(comprovanteDeposito == true){
            res.status(200).send('Depósito realizado com sucesso.')
            return

        }else if(comprovanteDeposito == false){
            return res.status(404).send({
                message: 'Não foi possível realizar o depósito: Dados Inválidos.'
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