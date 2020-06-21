import Usuario from '../schemas/usuarios.sch'

class UsuarioServ {

    // Função para serviço de busca de usuários.
    public async getUser(param) {
        const codigoConta = param.codigoConta
        const usuarios = await Usuario.findOne({ codigoConta: codigoConta })
        return usuarios
    }

    // Função para serviço de abertura de contas.
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
    
    // Função para serviço de fechamento de contas.
    public async delete(param){
        let codigoConta = parseInt(param.codigoConta)
        try{

            const result = await Usuario.deleteOne( { codigoConta: codigoConta })
            return result.deletedCount

        }catch(error){
            return `Erro: ${error}`
        }
    }

}
export default new UsuarioServ();