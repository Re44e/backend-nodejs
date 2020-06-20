import OpDeposito from '../schemas/opera.deposito.sch'
import Usuario from '../schemas/usuarios.sch'

class OpDepositoServ {

    // Função para serviço de busca de operações de depósito.
    public async getAll() {
        const depositos = await OpDeposito.find()
        return depositos
    }

    // Função para serviço de cadastro de operações de depósito.
    public async create(param) {

        try {
            const codigoConta = param.codigoConta
            const beneficiario = await Usuario.find({ codigoConta })

            if (beneficiario.length > 0 && param.valorDeposito) {
                const valorDeposito = await param.valorDeposito
                const saldoAtualBeneficiario = beneficiario[0].saldo
                const novoSaldoBeneficiario = parseFloat(valorDeposito) + saldoAtualBeneficiario
                const idUsuario = beneficiario[0]._id

                const tokenDeposito = await Usuario.findByIdAndUpdate(idUsuario, { saldo: novoSaldoBeneficiario })

                if (tokenDeposito) {
                    const registro = new OpDeposito({
                        beneficiario: param.beneficiario,
                        codigoConta: param.codigoConta,
                        valorDeposito: param.valorDeposito
                    })

                    const comprovanteDeposito = await registro.save({ validateBeforeSave: true })
    
                    if (comprovanteDeposito === registro) { 
                        return true 
                    }else { return false}

                } else{ return undefined }

            } else {
                return 2
            }

        } catch (error) {
            return `Erro: ${error}`
        }
    }

}
export default new OpDepositoServ();