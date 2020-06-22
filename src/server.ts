import app from './app'

// Área de conexão com o servidor.
const porta = 3333
app.listen(porta, () => {
  console.log(`Conexão estabelecida com servidor na porta: ${porta}`)
})
