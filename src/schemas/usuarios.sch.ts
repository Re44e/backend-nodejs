import { Schema, model, Document } from 'mongoose'

interface UsarioInterFace extends Document{
    nome?: string,
    tipoConta?: string,
    codigoConta?: number,
    saldo?: number
}

const UsuarioSchema = new Schema({
    nome: {type: String, required: true},
    tipoConta: {type: String, required: true},
    codigoConta: {type: Number, required: true},
    saldo: {type: Number, required: true} 
}, {
    timestamps: true
})

export default model<UsarioInterFace>('Usuario', UsuarioSchema)