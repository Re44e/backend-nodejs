import { Request, Response, json } from 'express'
import ServSaques from '../services/saque.serv'

class SaqueCtrl {
    
    // Função de acesso ao serviço de busca de configurações de saque.
    public async getAll (req: Request, res: Response): Promise<Response> {
        const saques = await ServSaques.getAll()
        return res.status(200).json(saques)
    }

    // Função de acesso ao serviço de cadastro de configurações de saque.
    public async create (req: Request, res: Response): Promise<Response> {
        const saque = await ServSaques.create(req.body)

        if(saque){
            res.status(200).send('Configurações de saque cadastradas com sucesso.')
            return
        }else{
            return res.status(500).send('Erro ao cadastrar configurações de saque.');
        }
        
    }

}

export default new SaqueCtrl();