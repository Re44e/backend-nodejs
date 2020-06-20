import { Schema, model, Document } from 'mongoose'

interface OpDepositoInterFace extends Document{
    beneficiario?: string
    codigoConta?: number
    valorDeposito?: number
}

const OpDepositoSchema = new Schema({
    beneficiario: String,
    codigoConta: {type: Number, required: true},
    valorDeposito: {type: Number, required: true}  
}, {
    timestamps: true
})

export default model<OpDepositoInterFace>('OpDeposito', OpDepositoSchema)