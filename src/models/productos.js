import mongoose, {Schema} from "mongoose"

const productoSchema = new Schema({
    producto: {
        type: String,
        require: true,
    },
    precio: {
        type: String,
        require: true,
    },
    stock: {
        type: String,
        require: true,
    },
    data: {
        type: Date,
        default: Date.now,
    },
    foto_url: {
        type: String,
        require: true,
        default: "prueba"
    },
    encargado: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    }

})

export default mongoose.model("Producto", productoSchema)