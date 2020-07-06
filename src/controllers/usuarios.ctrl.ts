import { Request, Response } from 'express'
import ServUsuarios from '../services/usuarios.serv'

class UsuarioCtrl {

    // Função de acesso ao serviço de busca de usuários.
    public async getAll(req: Request, res: Response): Promise<any> {
        await ServUsuarios.getUser(req.body)
        .then((resposta)=>{
            if (resposta) {
                return res.status(200).json(resposta)
            } else {
                return res.status(401).send({
                    message: 'Usuário não encontrado.'
                });
            }
        }).catch((error) => {
            return `Erro: ${error}`
        })
 
    }

    // Função de acesso ao serviço de abertura de contas.
    public async create(req: Request, res: Response): Promise<any> {
        await ServUsuarios.create(req.body)
            .then((resposta) => {
                switch (resposta) {
                    case true:
                        return res.status(200).send({
                            message: 'Abertura de conta realizada com sucesso.'
                        });
                    case false:
                        return res.status(401).send({
                            message: 'O código da conta informado já existe.'
                        });
                    default:
                        return res.status(500).send({
                            message: 'Erro ao cadastrar usuário.'
                        });
                }
            }).catch((error) => {
                return `Erro: ${error}`
            })

    }

    //Função de acesso ao serviço de encerramento de contas.
    public async delete(req: Request, res: Response): Promise<any> {
        await ServUsuarios.delete(req.body)
            .then((resposta) => {
                if (resposta > 0) {
                    return res.status(200).send({
                        message: 'Conta encerrada com sucesso.'
                    })
                }
                else {
                    return res.status(401).send({
                        message: 'Não foi possível encerrar a conta.'
                    });
                }
            }).catch((error) => {
                return `Erro: ${error}`
            })
    }
}



export default new UsuarioCtrl();