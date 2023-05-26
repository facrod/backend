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
})

export default mongoose.model("Prenda", prendaSchema)