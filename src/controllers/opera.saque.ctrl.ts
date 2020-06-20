import { Request, Response, json } from 'express'
import OpSaqueServ from '../services/opera.saque.serv'

class OpSaqueCtrl {
    
    // Função de acesso ao serviço de busca de operações de saques.
    public async getAll(req: Request, res: Response): Promise<Response> {
        const saques = await OpSaqueServ.getAll()
        return res.status(200).json(saques)
    }

    // Função de acesso ao serviço de cadastro de operações de saques.
    public async create(req: Request, res: Response): Promise<Response> {

        const comprovanteSaque = await OpSaqueServ.create(req.body)

        if(comprovanteSaque == 2){
            return  res.status(401).send({
                message: 'O valor do saque é maior que o permitido.'
            });
        }

        if(comprovanteSaque == 3){
            return  res.status(401).send({
                message: 'Você não possui saldo para valor solicitado.'
            });
        }

        if(comprovanteSaque == true){
            return res.status(200).send({
                message: 'Saque realizado com sucesso.'
            });
            

        }else if(comprovanteSaque == false){
            return res.status(500).send({
                message: 'Falha ao emitir comprovante de saque.'
            });
        }

        if(comprovanteSaque == undefined) {
            return res.status(500).send({
                message: 'Falha ao realizar saque.'
            });
        }
    }

}

export default new OpSaqueCtrl();