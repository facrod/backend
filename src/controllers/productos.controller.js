import productoSchema from "../models/productos";
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
async function getProducto(req, res) {    //por medio de un try and catch hacemos el código mucho más legible (async) 2) utilizams .find en prendasSchema para poder transformarlo en un array y guardarlo en una const para posteriormente mostrarlo en el return (el return sólo se pone en los try and catch ya qué en la otra forma es implicito)
    try {
       const productos = await productoSchema.find()
       return res.json(Sucess(productos))         
    
    } catch (error) {
        return res.json(Error(error)) 
    }
}

//CREA UNA PRENDA
async function postProducto (req,res) { //PUEDO HACER UN AUTHENTICA YA QUÉ EL USUARIO ESTARÁ LOGEADO 
    try {
        //const {id} = req.params
        //const encargadoP = await usuarioSchema.findById(id)
        const {producto, descripcion, categoria, precio, stock} = req.body //destructuro el body que recibo por req del post
        const newProducto = await productoSchema.create({
            producto,
            descripcion,
            categoria, 
            precio, 
            stock, 
            //encargado: encargadoP
        }) //Intetamos hacer una vinculacion del producto con los usuarios para ver quien agrego tal cosa 

        return res.json(Sucess(newProducto)); 
    
    } catch (error) {
        return res.json(Error(error))
    }
}

//LEE LA PRENDA POR SU ID 
async function getProductoId (req, res) {
    try {
    const {id} = req.params
    
    const productoId = await productoSchema.findById(id)

    return res.json(Sucess(productoId))


    } catch (error) {
        return res.json(Error(error))
    }
}

//MODIFICAR LA PRENDA 
async function putProducto (req, res) {
    try {
        const {id} = req.params
        const {producto, descripcion, categoria, precio, stock} = req.body
        const productoModificado = await productoSchema.findByIdAndUpdate(id, {
            producto,
            descripcion,
            categoria,
            precio,
            stock,
        })

        return res.json({
            ok: true,
            status: 200,
            data: {
                prevProduct: productoModificado,
                nexProduct: {producto, descripcion, categoria, precio, stock}
            }
        })

    } catch (error) {
        return res.json(Error(error))
    }
}

//ELIMINAR LA PRENDA
async function deleteProducto (req, res) {
    try {
        const {id} = req.params
        console.log(id)
        const productoDelete = await productoSchema.findByIdAndRemove(id)
        return res.json(Sucess(productoDelete))

    } catch (error) {
        return res.json(Error(error))
    }
}

async function UploadPictureProducto (req, res) {
    try {
        const {id} = req.params
        const photo = req.files["file"][0]
        const {secure_url} = await UploadPicture(photo)
        const response = await productoSchema.findByIdAndUpdate(id, {
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

export {getProducto, postProducto, getProductoId, putProducto, deleteProducto, Error, Sucess, UploadPictureProducto}