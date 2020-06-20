import Usuario from '../schemas/usuarios.sch'
import OpSaque from '../schemas/opera.saque.sch'
import Saque from '../schemas/saque.sch'

class OpSaqueServ {

    // Função para serviço de busca de operações de saque.
    public async getAll() {
        const saques = await OpSaque.find()
        return saques
    }

    // Função para serviço de cadastro de operações de saque.
    public async create(param) {

        try {
            const codigoConta = param.codigoConta
            let valorSaque = param.valorSaque

            const usuario = await Usuario.find({ codigoConta })
            const saldoAtualUsuario = usuario[0].saldo
            const dadosSaque = await Saque.find()

            const limiteSaque = dadosSaque[0].limiteSaque
            const taxaOperacao = dadosSaque[0].taxaOperacao

            if(valorSaque > limiteSaque) { return 2}

            if (valorSaque <= saldoAtualUsuario) {

                const novoSaldoUsuario = saldoAtualUsuario - (parseFloat(valorSaque.toString()) + parseFloat(taxaOperacao.toString()))
                const saldoConvertido = parseFloat(novoSaldoUsuario.toFixed(2))

                const idUsuario = usuario[0]._id
                const tokenSaque = await Usuario.findByIdAndUpdate(idUsuario, { saldo: saldoConvertido })

                if (tokenSaque) {
                    const registro = new OpSaque({
                        codigoConta: param.codigoConta,
                        valorSaque: param.valorSaque,
                    })

                    const comprovanteSaque = await registro.save({ validateBeforeSave: true })
                    if (comprovanteSaque === registro) {
                        return true
                    } else { return false }


                } else { return undefined }

            } else { return 3 }

        } catch (error) {
            return `Erro: ${error}`
        }
    }

}
export default new OpSaqueServ();