import { Request, Response } from 'express'
import ServUsuarios from '../services/usuarios.serv'

class UsuarioCtrl {
    
    // Função de acesso ao serviço de busca de usuários.
    public async getAll (req: Request, res: Response): Promise<Response> {
        const usuarios = await ServUsuarios.getAll()
        return res.status(200).json(usuarios)
    }
    
    // Função de acesso ao serviço de cadastro de usuários.
    public async create (req: Request, res: Response): Promise<Response> {
        const usuario = await ServUsuarios.create(req.body)

        if(usuario == true){
            return res.status(200).send({
                message: 'Usuário cadastrado com sucesso.'
            })
        }else if(usuario == false){
            return res.status(401).send({
                message: 'O código da conta informado já existe.'
            });
        }else{
            return res.status(500).send({
                message: 'Erro ao cadastrar usuário.'
            });
        }
    }
}

export default new UsuarioCtrl();