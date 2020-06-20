import { Schema, model, Document } from 'mongoose'
import mongoose from 'mongodb'

interface SaqueInterFace extends Document{
    limiteSaque?: mongoose.Decimal128,
    taxaOperacao?: mongoose.Decimal128
}

const SaqueSchema = new Schema({
    limiteSaque: mongoose.Decimal128,
    taxaOperacao: mongoose.Decimal128,

}, {
    timestamps: true
})

export default model<SaqueInterFace>('Saque', SaqueSchema)