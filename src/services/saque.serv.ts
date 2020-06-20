import Saque from '../schemas/saque.sch'

class SaqueServ {
    
    // Função para serviço de busca de configuraçãoes de saque .
    public async getAll() {
        const saques = await Saque.find()
        return saques
    }
    
    // Função para serviço de cadastro de configurações de saque.
    public async create(param) {

        try {

            // Configuração de regras de negócio para saque.
            const registro = new Saque ({
                limiteSaque: param.limiteSaque,
                taxaOperacao: param.taxaOperacao,
            })

            const saque = await registro.save({validateBeforeSave:true})
            return saque
         
          
        } catch (error) {
            return `Erro: ${error}`
        }

    }


}
export default new SaqueServ();