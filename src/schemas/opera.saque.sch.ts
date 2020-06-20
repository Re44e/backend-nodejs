import { Schema, model, Document } from 'mongoose'

interface OpSaqueInterFace extends Document{
    codigoConta?: number,
    valorSaque?: number
}

const OpSaqueSchema = new Schema({
    codigoConta: {type: Number, required: true},
    valorSaque: {type: Number, required: true}  
}, {
    timestamps: true
})

export default model<OpSaqueInterFace>('OpSaque', OpSaqueSchema)