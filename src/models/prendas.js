import mongoose, {Schema} from "mongoose"

const prendaSchema = new Schema({
    categoria: {
        type: String,
        require: true,
    },
    talle: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    data: {
        type: Date,
        default: Date.now,
    },
    foto_url: {
        type: String,
        require: true,
    },
    encargado: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    }

})

export default mongoose.model("Prenda", prendaSchema)