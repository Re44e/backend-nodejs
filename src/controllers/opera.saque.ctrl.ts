import { Request, Response, json } from 'express'
import OpSaqueServ from '../services/opera.saque.serv'

class OpSaqueCtrl {

    // Função de acesso ao serviço de busca de operações de saques.
    public async getAll(req: Request, res: Response): Promise<any> {
        await OpSaqueServ.getAll()
        .then((resposta)=>{
            if (resposta.length > 0) {
                return res.status(200).json(resposta)
            } else {
                return res.status(500).send({
                    message: 'Nenhuma operação de saque foi encontrada.'
                });
            }
        }).catch((error) => {
            return `Erro: ${error}`
        })
    }

    // Função de acesso ao serviço de cadastro de operações de saques.
    public async create(req: Request, res: Response): Promise<any> {

        await OpSaqueServ.create(req.body)
            .then((resposta) => {
                switch (resposta) {
                    case 2:
                        return res.status(401).send({
                            message: 'O valor do saque é maior que o permitido.'
                        });

                    case 3:
                        return res.status(401).send({
                            message: 'Você não possui saldo para valor solicitado.'
                        });

                    case true:
                        return res.status(200).send({
                            message: 'Saque realizado com sucesso.'
                        });

                    case false:
                        return res.status(500).send({
                            message: 'Falha ao emitir comprovante de saque.'
                        });
                    default:
                        return res.status(500).send({
                            message: 'Falha ao realizar saque.'
                        });
                }

            }).catch((error) => {
                return `Erro: ${error}`
            })

    }

}

export default new OpSaqueCtrl();