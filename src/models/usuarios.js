import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"

const usuarioSchema = new Schema ({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    repassword: {
        type: String,
        require: true,
    },
    loged: {
        type: String,
        require: true,
        default: false,
    }
})

//CREAMOS TOKEN

usuarioSchema.methods.generateAccesToken = function () {
    const token = jwt.sign({_id: this._id, nombre: this.nombre}, process.env.CLAVE)
    return token;
}

export default mongoose.model("Usuario", usuarioSchema)
