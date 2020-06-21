import { Request, Response } from 'express'
import ServUsuarios from '../services/usuarios.serv'

class UsuarioCtrl {

    // Função de acesso ao serviço de busca de usuários.
    public async getAll(req: Request, res: Response): Promise<Response> {
        const usuarios = await ServUsuarios.getUser(req.body)
        if(usuarios){
            return res.status(200).json(usuarios)
        }else{
            return res.status(401).send({
                message: 'Usuário não encontrado.'
            });
        }
    }

    // Função de acesso ao serviço de abertura de contas.
    public async create(req: Request, res: Response): Promise<Response> {
        const usuario = await ServUsuarios.create(req.body)

        if (usuario == true) {
            return res.status(200).send({
                message: 'Abertura de conta realizada com sucesso.'
            })
        } else if (usuario == false) {
            return res.status(401).send({
                message: 'O código da conta informado já existe.'
            });
        } else {
            return res.status(500).send({
                message: 'Erro ao cadastrar usuário.'
            });
        }
    }

    //Função de acesso ao serviço de encerramento de contas.
    public async delete(req: Request, res: Response): Promise<Response> {
        const result = await ServUsuarios.delete(req.body)
        if (result > 0) {
            return res.status(200).send({
                message: 'Conta encerrada com sucesso.'
            })
        } else {
            return res.status(500).send({
                message: 'Erro ao encerrar conta.'
            });
        }
    }
}

export default new UsuarioCtrl();