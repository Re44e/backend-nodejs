import { Router } from 'express'
import UserController from './controllers/usuarios.ctrl'
import OpDepositoController  from './controllers/opera.deposito.ctrl'
import SaqueController from './controllers/saque.ctrl'
import OpSaqueController from './controllers/opera.saque.ctrl'

const routes = Router()

//Configuração de rotas
routes.get('/usuarios', UserController.getAll)
routes.post('/usuarios', UserController.create)
routes.get('/opdeposito', OpDepositoController.getAll)
routes.post('/opdeposito', OpDepositoController.create)
routes.get('/saque', SaqueController.getAll)
routes.post('/saque', SaqueController.create)
routes.get('/opsaque', OpSaqueController.getAll)
routes.post('/opsaque', OpSaqueController.create)

export default routes