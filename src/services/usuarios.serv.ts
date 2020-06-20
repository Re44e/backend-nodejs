import Usuario from '../schemas/usuarios.sch'

class UsuarioServ {

    // Função para serviço de busca de usuários.
    public async getAll() {
        const usuarios = await Usuario.find()
        return usuarios
    }

    // Função para serviço de cadastro de usuários.
    public async create(param) {

        try {
            const codigoConta = param.codigoConta
            const contaUsuario = await Usuario.find({ codigoConta })

            if (contaUsuario.length > 0) { return false }

            const registro = new Usuario({
                nome: param.nome,
                tipoConta: param.tipoConta,
                codigoConta: param.codigoConta,
                saldo: param.saldo
            })

            const usuario = await registro.save({ validateBeforeSave: true })
            if (usuario === registro) {
                return true
            }

        } catch (error) {
            return `Erro: ${error}`
        }

    }

}
export default new UsuarioServ();