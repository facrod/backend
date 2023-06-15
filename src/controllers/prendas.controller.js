import prendaSchema from "../models/prendas";
import usuarioSchema from "../models/usuarios"
import { UploadPicture } from "./cloudinary.controller";

//funciones para simplificar el codigo, lo qué hago acá es pasar las res.json por una función asi queda más legible y menos lineas
function Error (e) {
    return {
        ok: false,
        status: 400,
        data: e
    }
}

function Sucess (a) {
    return {
        ok: true,
        status: 200,
        data: a
    }
}

//LEE LAS PRENDAS QUE HAY 
async function getPrenda(req, res) {    //por medio de un try and catch hacemos el código mucho más legible (async) 2) utilizams .find en prendasSchema para poder transformarlo en un array y guardarlo en una const para posteriormente mostrarlo en el return (el return sólo se pone en los try and catch ya qué en la otra forma es implicito)
    try {
       const prendas = await prendaSchema.find()
       return res.json(Sucess(prendas))         
    
    } catch (error) {
        return res.json(Error(error)) 
    }
}

//CREA UNA PRENDA
async function postPrenda (req,res) {
    try {
        const {id} = req.params
        const encargadoP = await usuarioSchema.findById(id)
        const {categoria, talle, color, stock} = req.body //destructuro el body que recibo por req del post
        const newPrenda = await prendaSchema.create({
            categoria, 
            talle, 
            color, 
            stock,
            encargado: encargadoP
        }) //NO FUNCIONA 

        return res.json(Sucess(newPrenda)); 
    
    } catch (error) {
        return res.json(Error(error))
    }
}

//LEE LA PRENDA POR SU ID 
async function getPrendaId (req, res) {
    try {
    const {id} = req.params
    
    const prendaId = await prendaSchema.findById(id)

    return res.json(Sucess(prendaId))


    } catch (error) {
        return res.json(Error(error))
    }
}

//MODIFICAR LA PRENDA 
async function putPrenda (req, res) {
    try {
        const {id} = req.params
        const {categoria, talle, color, stock} = req.body
        const prendaModificada = await prendaSchema.findByIdAndUpdate(id, {
            categoria,
            talle,
            color,
            stock,
        })

        return res.json({
            ok: true,
            status: 200,
            data: {
                previusPrenda: prendaModificada,
                nexPrenda: {categoria, talle, color, stock}
            }
        })

    } catch (error) {
        return res.json(Error(error))
    }
}

//ELIMINAR LA PRENDA
async function deletePrenda (req, res) {
    try {
        const {id} = req.params
        const prendaDelete = await prendaSchema.findByIdAndRemove(id)
        return res.json(Sucess(prendaDelete))

    } catch (error) {
        return res.json(Error(error))
    }
}

async function UploadPicturePrenda (req, res) {
    try {
        const {id} = req.params
        const photo = req.files["file"][0]
        const {secure_url} = await UploadPicture(photo)
        const response = await prendaSchema.findByIdAndUpdate(id, {
            $set: {
                foto_url: secure_url
            }
        })
        response.foto_url = secure_url

        return res.json(Sucess(response))

    } catch (err) {
        return res.json(Error(err))
    }
}

export {getPrenda, postPrenda, getPrendaId, putPrenda, deletePrenda, Error, Sucess, UploadPicturePrenda}